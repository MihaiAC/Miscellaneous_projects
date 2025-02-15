const { caesarCipher } = require("../caesar-cipher");

test("Handle non-letter character", () => {
  expect(caesarCipher("abc..dfA", 1)).toBe("bcd..egB");
});

test("Handle rotate by more than 26", () => {
  expect(caesarCipher("abc", 27)).toBe("bcd");
});

test("Handle wrapping", () => {
  expect(caesarCipher("xyz", 3)).toBe("abc");
});

test("Handle empty string", () => {
  expect(caesarCipher("", 2)).toBe("");
});

test("Handle capitalized", () => {
  expect(caesarCipher("aBc", 3)).toBe("dEf");
});

test("Rotate by 3", () => {
  expect(caesarCipher("abc", 3)).toBe("def");
});

test("Rotate by zero", () => {
  expect(caesarCipher("abc", 0)).toBe("abc");
});

test("Invalid argument tests", () => {
  expect(() => caesarCipher([], 2)).toThrow(
    "caesarCipher: first argument must be a string"
  );
  expect(() => caesarCipher("bla", "x")).toThrow(
    "caesarCipher: second argument must be an integer"
  );
});
