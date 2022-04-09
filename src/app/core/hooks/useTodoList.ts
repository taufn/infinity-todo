import useSWR from "swr";

import { TodoItem } from "../contracts";
import { FetcherResult } from "./contracts";
import { todoRepo } from "~/app/repositories";

type FetchTodoList = FetcherResult<TodoItem[]>;

export function useTodoList(): FetchTodoList {
  const { data, error } = useSWR("todoRepo.getTodoList", todoRepo.getTodoList);

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
