import { TodoState } from "~/app/core/contracts";

export type ViewTodoItem = {
  id: string;
  summary: string;
  state: TodoState;
};
