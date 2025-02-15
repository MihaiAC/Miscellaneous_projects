const { add, subtract, divide, multiply } = require("../calculator.js");

test("Test add normal usage", () => {
  expect(add(1, 2)).toBe(3);
  expect(add(-3, 2)).toBe(-1);
});

test("Test subtract normal usage", () => {
  expect(subtract(1, 2)).toBe(-1);
});

test("Test multiply normal usage", () => {
  expect(multiply(1, 2)).toBe(2);
  expect(multiply(-2, -2)).toBe(4);
});

test("Test divide normal usage", () => {
  expect(divide(2, 1)).toBe(2);
  expect(divide(5, 2)).toBe(2);
});

test("Test divide by zero", () => {
  expect(() => divide(5, 0)).toThrow("Division by zero");
});
