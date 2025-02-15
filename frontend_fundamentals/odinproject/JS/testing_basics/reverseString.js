function reverseString(string) {
  if (typeof string !== "string") {
    throw new Error("Invalid argument");
  }

  if (string.length === 0) {
    return string;
  }

  return string.split("").reverse().join("");
}

module.exports = { reverseString };
