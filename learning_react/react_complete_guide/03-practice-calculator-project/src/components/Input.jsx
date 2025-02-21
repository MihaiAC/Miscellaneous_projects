/* eslint-disable react/prop-types */
import {
  validateDecimalOrInt,
  validatePositiveInt,
} from "../util/inputValidators";
import InputField from "./InputField";

export default function Input({ onInputChange, data }) {
  let currentVals = data;

  function handleValidInput(variable_id, value) {
    currentVals[variable_id] = value;
    onInputChange(currentVals);
  }

  return (
    <>
      <section id="user-input">
        <div className="input-group">
          <div className="input-col">
            <InputField
              inputLabel="INITIAL INVESTMENT"
              id="initialInvestment"
              type="text"
              validateFunction={validatePositiveInt}
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
              validateFunction={validatePositiveInt}
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
      </section>
    </>
  );
}
