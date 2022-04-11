import { TodoItem, TodoRepo, TodoState } from "../core/contracts";

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
  };
}
