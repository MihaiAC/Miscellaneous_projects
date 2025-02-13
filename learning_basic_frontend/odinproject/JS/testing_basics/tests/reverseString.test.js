const { reverseString } = require("../reverseString");

test("Tests normal uses", () => {
  expect(reverseString("dog")).toBe("god");
  expect(reverseString("abc45%AB")).toBe("BA%54cba");
});

test("Tests edge cases", () => {
  expect(reverseString("")).toBe("");
  expect(() => reverseString([])).toThrow("Invalid argument");
  expect(() => reverseString(undefined)).toThrow("Invalid argument");
  expect(() => reverseString(null)).toThrow("Invalid argument");
});
