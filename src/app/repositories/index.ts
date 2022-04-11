import { TodoRepo } from "../core/contracts";
import { createTodoRepoLocalStorage } from "./todoRepoLocalStorage";

export const todoRepo: TodoRepo = createTodoRepoLocalStorage(window.localStorage);
