function capitalize(string) {
  if (typeof string !== "string") {
    throw new Error("Invalid argument");
  }

  if (string === "") {
    return string;
  }

  if (/^[a-zA-Z]/.test(string[0])) {
    return string[0].toUpperCase() + string.slice(1);
  }

  return string;
}

module.exports = { capitalize };
