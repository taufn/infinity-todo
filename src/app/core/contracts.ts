export enum TodoState {
  Open = "todo_state.open",
  Ongoing = "todo_state.ongoing",
  Done = "todo_state.done",
}

export type TodoItem = {
  id: string;
  summary: string;
  state: TodoState;
  createdAt: Date;
  updatedAt: Date | null;
};
export type EditTodoItemParams = Partial<Pick<TodoItem, "summary" | "state">>;

export interface TodoRepo {
  getTodoList(): Promise<TodoItem[]>;
  addTodoItem(summary: string): Promise<TodoItem>;
  editTodoItem(id: string, params: EditTodoItemParams): Promise<void>;
  moveTodoItem(id: string, direction: "up" | "down"): Promise<void>;
}
