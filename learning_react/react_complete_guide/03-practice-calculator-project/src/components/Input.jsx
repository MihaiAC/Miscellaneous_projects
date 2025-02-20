/* eslint-disable react/prop-types */
import {
  validateDecimalOrInt,
  validateNonNegativeInt,
  validatePositiveInt,
} from "../util/inputValidators";
import InputField from "./InputField";

export default function Input({ onValidAction }) {
  let currentVals = {
    initialInvestment: "",
    annualInvestment: "",
    expectedReturn: "",
    duration: "",
  };

  function handleValidInput(variable_id, value) {
    currentVals[variable_id] = value;
    handleInput(currentVals);
  }

  function handleInput(currentVals) {
    // If all the values are set, emit the output.
    const validInput = Object.values(currentVals).every(
      (value) => value !== ""
    );

    if (validInput) {
      onValidAction(currentVals);
    }
  }

  return (
    <>
      <div id="user-input">
        <div className="input-group">
          <div className="input-col">
            <InputField
              inputLabel="INITIAL INVESTMENT"
              id="initialInvestment"
              type="text"
              validateFunction={validateNonNegativeInt}
              onValidInput={handleValidInput}
            />

            <InputField
              inputLabel="EXPECTED RETURN"
              id="expectedReturn"
              type="text"
              validateFunction={validateDecimalOrInt}
              onValidInput={handleValidInput}
            />
          </div>
          <div className="input-col">
            <InputField
              inputLabel="ANNUAL INVESTMENT"
              id="annualInvestment"
              type="text"
              validateFunction={validateNonNegativeInt}
              onValidInput={handleValidInput}
            />

            <InputField
              inputLabel="DURATION"
              id="duration"
              type="number"
              validateFunction={validatePositiveInt}
              onValidInput={handleValidInput}
            />
          </div>
        </div>
      </div>
    </>
  );
}
