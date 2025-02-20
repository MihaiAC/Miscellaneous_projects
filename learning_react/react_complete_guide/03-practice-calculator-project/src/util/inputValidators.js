export function validateNonNegativeInt(value) {
  if (value === "") {
    return "";
  } else if (!/^\d+$/.test(value)) {
    return "Must be a positive integer.";
  }

  // Correct input.
  return "";
}

export function validateDecimalOrInt(value) {
  if (value === "") {
    return "";
  } else if (!/^\d+(\.\d+)?$/.test(value)) {
    return "Must be a positive number.";
  }

  return "";
}
