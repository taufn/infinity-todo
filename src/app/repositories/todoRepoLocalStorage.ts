import { EditTodoItemParams, TodoItem, TodoRepo, TodoState } from "../core/contracts";

export function parseAndValidateStorageData(storageData: string): TodoItem[] {
  let result: any[] = [];

  try {
    result = JSON.parse(storageData);
  } catch (error) {
    throw new Error("Unexpected JSON parsing");
  }

  if (!Array.isArray(result)) {
    throw new Error("Unexpected data: not array ");
  }

  return result.map<TodoItem>(item => {
    if (
      typeof item.id === "undefined" ||
      typeof item.summary === "undefined" ||
      typeof item.state === "undefined" ||
      typeof item.createdAt === "undefined" ||
      typeof item.updatedAt === "undefined"
    ) {
      throw new Error("Unexpected data: not TodoItem");
    }

    return {
      id: item.id,
      summary: item.summary,
      state: item.state,
      createdAt: new Date(item.createdAt),
      updatedAt: typeof item.updatedAt === "string" ? new Date(item.updatedAt) : null,
    };
  });
}

export function createTodoRepoLocalStorage(storage: Storage): TodoRepo {
  const todoListKey = "todolist";

  return {
    async getTodoList(): Promise<TodoItem[]> {
      const storedData = storage.getItem(todoListKey);
      return storedData === null ? [] : parseAndValidateStorageData(storedData);
    },

    async addTodoItem(summary: string): Promise<TodoItem> {
      const now = new Date();
      const newItem: TodoItem = {
        id: `item-${now.valueOf()}`,
        summary,
        state: TodoState.Open,
        createdAt: now,
        updatedAt: null,
      };
      const todoList: TodoItem[] = await this.getTodoList();

      todoList.unshift(newItem);
      storage.setItem(todoListKey, JSON.stringify(todoList));
      return newItem;
    },

    async editTodoItem(id: string, params: EditTodoItemParams): Promise<void> {
      if (typeof params.state === "undefined" && typeof params.summary !== "string") {
        throw new Error("Params cannot be empty");
      }

      if (
        typeof params.state !== "undefined" &&
        params.state !== TodoState.Open &&
        params.state !== TodoState.Ongoing &&
        params.state !== TodoState.Done
      ) {
        throw new Error("Param state is invalid");
      }

      if (typeof params.summary === "string" && params.summary === "") {
        throw new Error("Param summary is invalid");
      }

      const todoList = await this.getTodoList();
      const todoItem = todoList.find(item => item.id === id);
      if (typeof todoItem === "undefined") {
        // TODO: refactor errors
        // eslint-disable-next-line sonarjs/no-duplicate-string
        throw new Error("Todo item is not found");
      }

      todoItem.state = params.state ?? todoItem.state;
      todoItem.summary = params.summary ?? todoItem.summary;
      const updatedTodoList = todoList.map(item =>
        item.id === id ? { ...todoItem } : { ...item },
      );
      storage.setItem(todoListKey, JSON.stringify(updatedTodoList));
    },

    async moveTodoItem(id: string, direction: "up" | "down"): Promise<void> {
      if (direction !== "up" && direction !== "down") {
        throw new Error("Direction should be `up` or `down`");
      }

      const todoList = await this.getTodoList();
      const itemIndex = todoList.findIndex(item => item.id === id);
      if (itemIndex < 0) {
        throw new Error("Todo item is not found");
      }

      let indexToMove: number = -1;
      if (direction === "up" && itemIndex > 0) {
        indexToMove = itemIndex - 1;
      } else if (direction === "down" && itemIndex < todoList.length - 1) {
        indexToMove = itemIndex + 1;
      } else {
        return;
      }

      const todoItem = todoList.find(item => item.id === id);
      const otherItemToMove = todoList[indexToMove];
      const updatedTodoList = todoList.map((item, index) => {
        if (index === indexToMove) {
          return todoItem;
        }

        if (index === itemIndex) {
          return otherItemToMove;
        }

        return item;
      });
      storage.setItem(todoListKey, JSON.stringify(updatedTodoList));
    },

    async removeTodoItem(id: string): Promise<void> {
      const todoList = await this.getTodoList();
      const updatedTodoList = todoList.filter(item => item.id !== id);

      if (updatedTodoList.length === todoList.length) {
        throw new Error("Todo item is not found");
      }

      storage.setItem(todoListKey, JSON.stringify(updatedTodoList));
    },
  };
}
