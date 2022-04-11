import useSWR from "swr";

import { TodoItem } from "../contracts";
import { FetcherResult } from "./contracts";
import { todoRepo } from "~/app/repositories";

type FetchTodoList = FetcherResult<TodoItem[]>;

export const TODO_LIST_KEY = "todoRepo.getTodoList";

export function useTodoList(): FetchTodoList {
  const { data, error } = useSWR(TODO_LIST_KEY, todoRepo.getTodoList);

  if (typeof error !== "undefined") {
    return {
      state: "error",
      errors: [error],
    };
  }

  if (typeof data !== "undefined") {
    return { data, state: "success" };
  }

  return { state: "loading" };
}
