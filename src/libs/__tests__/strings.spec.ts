import strings from "../strings";

describe("libs/strings", () => {
  describe("capitalize()", () => {
    it("should be defined", () => {
      expect(typeof strings.capitalize).toBe("function");
    });

    it("should capitalize the beginning of the strings", () => {
      expect(strings.capitalize("oakland athletic")).toBe("Oakland athletic");
    });

    it("should allow to capitalize each word of the strings", () => {
      expect(strings.capitalize("oakland athletic", { eachWord: true })).toBe("Oakland Athletic");
    });

    it("should allow to capitalize words separated by custom separator", () => {
      expect(
        strings.capitalize("mary-jane watson", {
          eachWord: true,
          additionalSeparator: ["-"],
        }),
      ).toBe("Mary-Jane Watson");
    });
  });
});
