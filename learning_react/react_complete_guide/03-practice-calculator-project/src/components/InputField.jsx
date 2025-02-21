/* eslint-disable react/prop-types */
import { useState } from "react";

export default function InputField({
  inputLabel,
  validateFunction,
  onValidInput,
  id,
  ...props
}) {
  const [inputState, setInputState] = useState({ value: "", error: "" });

  function handleInput(event) {
    const newInputValue = event.target.value;
    const [validatedValue, errorMsg] = validateFunction(newInputValue);

    if (errorMsg === "") {
      setInputState({ value: validatedValue, error: errorMsg });
      onValidInput(id, validatedValue);
    } else {
      setInputState({ value: newInputValue, error: errorMsg });
    }
  }

  return (
    <>
      <label htmlFor={id}>{inputLabel}</label>
      <input
        value={inputState["value"]}
        onChange={handleInput}
        id={id}
        {...props}
      />
      <span className={inputState["error"] == "" ? "hidden" : "visible"}>
        {inputState["error"]}
      </span>
    </>
  );
}
