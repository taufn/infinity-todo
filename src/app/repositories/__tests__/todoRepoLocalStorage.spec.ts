import { mock } from "jest-mock-extended";

import { createTodoRepoLocalStorage, parseAndValidateStorageData } from "../todoRepoLocalStorage";
import { TodoItem, TodoState } from "~/app/core/contracts";

describe("app/repositories/todoRepoLocalStorage", () => {
  describe("createTodoRepoLocalStorage()", () => {
    it("should be defined", () => {
      expect(typeof createTodoRepoLocalStorage).toBe("function");
    });

    it("should return the todorepo implementation", () => {
      const mockStorage = mock<Storage>();
      const todoRepo = createTodoRepoLocalStorage(mockStorage);

      expect(typeof todoRepo.getTodoList).toBe("function");
      expect(typeof todoRepo.addTodoItem).toBe("function");
    });
  });

  describe("todoRepoLocalStorage", () => {
    describe("getTodoList()", () => {
      it("should retrieve the current todo list from storage", async () => {
        const mockStorage = mock<Storage>();
        const todoRepo = createTodoRepoLocalStorage(mockStorage);

        mockStorage.getItem.mockReturnValue(null);
        await expect(todoRepo.getTodoList()).resolves.not.toThrow();
        expect(mockStorage.getItem).toBeCalledTimes(1);
        expect(mockStorage.getItem).toBeCalledWith(expect.stringMatching(/list/gi));
      });

      it("should return empty array if no storage found", async () => {
        const mockStorage = mock<Storage>();
        const todoRepo = createTodoRepoLocalStorage(mockStorage);

        mockStorage.getItem.mockReturnValue(null);
        await expect(todoRepo.getTodoList()).resolves.toEqual([]);
      });

      it("should throw if stored data does not match contract", async () => {
        const mockStorage = mock<Storage>();
        const todoRepo = createTodoRepoLocalStorage(mockStorage);

        mockStorage.getItem.mockReturnValueOnce("this is an invalid string");
        await expect(todoRepo.getTodoList()).rejects.toThrow(/parsing/gi);

        mockStorage.getItem.mockReturnValueOnce("{}");
        await expect(todoRepo.getTodoList()).rejects.toThrow(/array/gi);

        mockStorage.getItem.mockReturnValueOnce(
          JSON.stringify([{ foo: "foo", bar: true, baz: 12 }]),
        );
        await expect(todoRepo.getTodoList()).rejects.toThrow(/todoitem/gi);
      });

      it("should return parsed value if found from storage", async () => {
        const mockStorage = mock<Storage>();
        const todoRepo = createTodoRepoLocalStorage(mockStorage);
        const stubTodoItem: TodoItem = {
          id: "todoitemid",
          summary: "todoitemsummary",
          state: TodoState.Done,
          createdAt: new Date(),
          updatedAt: null,
        };

        mockStorage.getItem.mockReturnValue(JSON.stringify([stubTodoItem]));
        await expect(todoRepo.getTodoList()).resolves.toEqual([stubTodoItem]);
      });
    });

    describe("addTodoItem()", () => {
      it("should initiate a new list if not exist yet", async () => {
        const mockStorage = mock<Storage>();
        const todoRepo = createTodoRepoLocalStorage(mockStorage);
        const paramSummary = "new item";
        let storageAssertion: TodoItem[] = [];

        mockStorage.getItem.mockReturnValue(null);
        mockStorage.setItem.mockImplementation(
          (_, value) => (storageAssertion = JSON.parse(value)),
        );

        await expect(todoRepo.addTodoItem(paramSummary)).resolves.not.toThrow();
        expect(mockStorage.setItem).toBeCalledWith(
          expect.stringContaining("list"),
          expect.stringContaining(paramSummary),
        );
        expect(storageAssertion.length === 1).toBe(true);
        expect(storageAssertion[0].summary).toBe(paramSummary);
      });

      it("should create a new item at the top of the todo list", async () => {
        const mockStorage = mock<Storage>();
        const todoRepo = createTodoRepoLocalStorage(mockStorage);
        const stubTodoList: TodoItem[] = [
          {
            id: "olderid",
            summary: "older summary",
            state: TodoState.Done,
            createdAt: new Date(),
            updatedAt: null,
          },
        ];
        const paramSummary = "new item";

        mockStorage.getItem.mockReturnValueOnce(JSON.stringify(stubTodoList));
        await expect(todoRepo.addTodoItem(paramSummary)).resolves.not.toThrow();
        const paramTodoList: TodoItem[] = parseAndValidateStorageData(
          mockStorage.setItem.mock.calls[0][1],
        );
        expect(paramTodoList.length > stubTodoList.length).toBe(true);
        expect(paramTodoList[0].summary).toBe(paramSummary);
      });

      it("should return the created item", async () => {
        const mockStorage = mock<Storage>();
        const todoRepo = createTodoRepoLocalStorage(mockStorage);
        const stubTodoList: TodoItem[] = [];
        const paramSummary = "new item";

        mockStorage.getItem.mockReturnValueOnce(JSON.stringify(stubTodoList));
        const result = await todoRepo.addTodoItem(paramSummary);
        expect(typeof result.id === "string" && result.id.length > 0).toBe(true);
        expect(result.summary).toBe(paramSummary);
        expect(result.state).toBe(TodoState.Open);
        expect(result.createdAt instanceof Date).toBe(true);
        expect(result.updatedAt).toBeNull();
      });
    });
  });
});
