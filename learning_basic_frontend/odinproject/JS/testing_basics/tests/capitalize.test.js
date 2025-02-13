const { capitalize } = require("../capitalize");

test("Tests normal uses", () => {
  expect(capitalize("dog")).toBe("Dog");
  expect(capitalize("Dog")).toBe("Dog");
});

test("Tests edge cases", () => {
  expect(capitalize("")).toBe("");
  expect(capitalize("1abc")).toBe("1abc");
  expect(capitalize("#abc")).toBe("#abc");
  expect(() => capitalize(undefined)).toThrow("Invalid argument");
  expect(() => capitalize(null)).toThrow("Invalid argument");
});
