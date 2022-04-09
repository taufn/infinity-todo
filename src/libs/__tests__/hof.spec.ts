import hof from "../hof";

describe("libs/hof", () => {
  describe("useTimeout", () => {
    it("should be defined", () => {
      expect(typeof hof.useTimeout).toBe("function");
    });

    it("should execute the function with a default delay time", () => {
      const testFn = jest.fn();

      jest.useFakeTimers();
      jest.spyOn(window, "setTimeout");

      hof.useTimeout(testFn);
      // no immediate call
      expect(testFn).not.toBeCalled();
      expect(window.setTimeout).toBeCalledWith(expect.any(Function), 200);

      jest.useRealTimers();
    });

    it("should execute the function with a given delay time", () => {
      const testFn = jest.fn();
      const delay = 500;

      jest.useFakeTimers();
      jest.spyOn(window, "setTimeout");

      hof.useTimeout(testFn, delay);
      // no immediate call
      expect(testFn).not.toBeCalled();
      expect(window.setTimeout).toBeCalledWith(expect.any(Function), delay);

      jest.useRealTimers();
    });
  });
});
