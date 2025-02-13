function caesarCipher(string, num) {
  if (typeof string !== "string") {
    throw new Error("caesarCipher: first argument must be a string");
  }

  if (typeof num !== "number" || !Number.isInteger(num)) {
    throw new Error("caesarCipher: second argument must be an integer");
  }

  if (num === 0) {
    return string;
  }

  let stringList = string.split("");
  let transformed = [];
  let intCode = 0;
  let baseAscii = 0;

  const a_ascii = 97;
  const A_ascii = 65;

  stringList.forEach((element) => {
    if (/[a-z]/.test(element)) {
      baseAscii = a_ascii;
    } else if (/[A-Z]/.test(element)) {
      baseAscii = A_ascii;
    } else {
      transformed.push(element);
      return;
    }

    intCode = element.charCodeAt(0);
    intCode = intCode - baseAscii;
    intCode = ((intCode + num) % 26) + baseAscii;
    transformed.push(String.fromCharCode(intCode));
  });

  return transformed.join("");
}

module.exports = { caesarCipher };
