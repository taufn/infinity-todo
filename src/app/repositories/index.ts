import { createTodoRepoLocalStorage } from "./todoRepoLocalStorage";

export const todoRepo = createTodoRepoLocalStorage(window.localStorage);
