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

export interface TodoRepo {
  getTodoList(): Promise<TodoItem[]>;
  addTodoItem(summary: string): Promise<TodoItem>;
}
