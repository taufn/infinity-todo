import { mock } from "jest-mock-extended";

import { createTodoRepoLocalStorage } from "../todoRepoLocalStorage";
import { TodoItem, TodoState } from "~/app/core/contracts";

describe("app/repositories/todoRepoLocalStorage", () => {
  describe("createTodoRepoLocalStorage()", () => {
    it("should be defined", () => {
      expect(typeof createTodoRepoLocalStorage).toBe("function");
    });

    it("should return the todorepo implementation", () => {
      const storage = mock<Storage>();
      const todoRepo = createTodoRepoLocalStorage(storage);

      expect(typeof todoRepo.getTodoList).toBe("function");
    });
  });

  describe("todoRepoLocalStorage", () => {
    describe("getTodoList()", () => {
      it("should retrieve the current todo list from storage", async () => {
        const storage = mock<Storage>();
        const todoRepo = createTodoRepoLocalStorage(storage);

        storage.getItem.mockReturnValue(null);
        await expect(todoRepo.getTodoList()).resolves.not.toThrow();
        expect(storage.getItem).toBeCalledTimes(1);
        expect(storage.getItem).toBeCalledWith(expect.stringMatching(/list/gi));
      });

      it("should return empty array if no storage found", async () => {
        const storage = mock<Storage>();
        const todoRepo = createTodoRepoLocalStorage(storage);

        storage.getItem.mockReturnValue(null);
        await expect(todoRepo.getTodoList()).resolves.toEqual([]);
      });

      it("should throw if stored data does not match contract", async () => {
        const storage = mock<Storage>();
        const todoRepo = createTodoRepoLocalStorage(storage);

        storage.getItem.mockReturnValueOnce("this is an invalid string");
        await expect(todoRepo.getTodoList()).rejects.toThrow(/parsing/gi);

        storage.getItem.mockReturnValueOnce("{}");
        await expect(todoRepo.getTodoList()).rejects.toThrow(/array/gi);

        storage.getItem.mockReturnValueOnce(JSON.stringify([{ foo: "foo", bar: true, baz: 12 }]));
        await expect(todoRepo.getTodoList()).rejects.toThrow(/todoitem/gi);
      });

      it("should return parsed value if found from storage", async () => {
        const storage = mock<Storage>();
        const todoRepo = createTodoRepoLocalStorage(storage);
        const mockTodoItem: TodoItem = {
          id: "todoitemid",
          summary: "todoitemsummary",
          state: TodoState.Done,
          createdAt: new Date(),
          updatedAt: null,
        };

        storage.getItem.mockReturnValue(JSON.stringify([mockTodoItem]));
        await expect(todoRepo.getTodoList()).resolves.toEqual([mockTodoItem]);
      });
    });
  });
});
