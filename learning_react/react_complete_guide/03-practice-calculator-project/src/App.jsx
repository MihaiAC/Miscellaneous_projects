import { calculateInvestmentResults, formatter } from "./util/investment";
import Input from "./components/Input";
import {
  validateDecimalOrInt,
  validateNonNegativeInt,
  validatePositiveInt,
} from "./util/inputValidators";

function App() {
  let currentVals = {
    initialInvestment: "",
    annualInvestment: "",
    expectedReturn: "",
    duration: "",
  };

  function handleValidInput(variable_id, value) {
    currentVals[variable_id] = value;
    handleOutput();
  }

  function handleOutput() {
    // If all the values are set, emit the output.
    const validInput = Object.values(currentVals).every(
      (value) => value !== ""
    );

    console.log(Object.values(currentVals));

    if (validInput) {
      return console.log("We have some valid input here!");
    }
  }

  return (
    <>
      <div id="header">
        <img src="/investment-calculator-logo.png" alt="" />
        <h1>Investment Calculator</h1>
      </div>
      <div id="user-input">
        <div className="input-group">
          <div className="input-col">
            <Input
              inputLabel="INITIAL INVESTMENT"
              id="initialInvestment"
              type="text"
              validateFunction={validateNonNegativeInt}
              onValidInput={handleValidInput}
            ></Input>

            <Input
              inputLabel="EXPECTED RETURN"
              id="expectedReturn"
              type="text"
              validateFunction={validateDecimalOrInt}
              onValidInput={handleValidInput}
            ></Input>
          </div>
          <div className="input-col">
            <Input
              inputLabel="ANNUAL INVESTMENT"
              id="annualInvestment"
              type="text"
              validateFunction={validateNonNegativeInt}
              onValidInput={handleValidInput}
            ></Input>

            <Input
              inputLabel="DURATION"
              id="duration"
              type="number"
              validateFunction={validatePositiveInt}
              onValidInput={handleValidInput}
            ></Input>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
