import { useState } from "react";

export default function Input({
  inputLabel,
  inputId,
  inputType,
  validateFunction,
  onValidInput,
}) {
  const [formValue, setFormValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleInput(event) {
    const newFormValue = event.target.value;
    const error = validateFunction(newFormValue);

    if (error != "") {
      setErrorMessage(error);
    } else {
      onValidInput(inputId, newFormValue);
    }
    setFormValue(newFormValue);
  }

  return (
    <>
      <label htmlFor={inputId}>{inputLabel}</label>
      <input
        type={inputType}
        id={inputId}
        value={formValue}
        onChange={handleInput}
      />
      <span className={errorMessage == "" ? "hidden" : "visible"}>
        {errorMessage}
      </span>
    </>
  );
}
