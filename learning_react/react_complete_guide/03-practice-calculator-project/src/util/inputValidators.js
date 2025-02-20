export function validateNonNegativeInt(value) {
  let [retValue, errorMsg] = ["", ""];
  if (value !== "") {
    if (!/^\d+$/.test(value)) {
      errorMsg = "Must be a positive integer.";
    } else {
      retValue = parseInt(value);
    }
  }

  return [retValue, errorMsg];
}

export function validatePositiveInt(value) {
  let [retValue, errorMsg] = validateNonNegativeInt(value);

  if (!errorMsg && retValue === 0) {
    errorMsg = "Must be a positive integer.";
    retValue = "";
  }

  return [retValue, errorMsg];
}

export function validateDecimalOrInt(value) {
  let [retValue, errorMsg] = ["", ""];
  if (value !== "") {
    if (!/^\d+(\.\d+)?$/.test(value)) {
      errorMsg = "Must be a positive number.";
    } else {
      retValue = parseFloat(value);
    }
  }

  return [retValue, errorMsg];
}
