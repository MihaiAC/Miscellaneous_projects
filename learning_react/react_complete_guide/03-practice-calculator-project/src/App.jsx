import { calculateInvestmentResults, formatter } from "./util/investment";

function App() {
  return (
    <>
      <div id="header">
        <img src="/investment-calculator-logo.png" alt="" />
        <h1>Investment Calculator</h1>
      </div>
      <div id="user-input">
        <div class="input-group">
          <div>
            <label htmlFor="initialInvestment">INITIAL INVESTMENT</label>
            <input type="text" id="initialInvestment" />

            <label htmlFor="annualInvestment">ANNUAL INVESTMENT</label>
            <input type="text" id="annualInvestment" />
          </div>
          <div>
            <label htmlFor="expectedReturn">EXPECTED RETURN</label>
            <input type="text" id="expectedReturn" />

            <label htmlFor="duration">DURATION</label>
            <input type="number" id="duration" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
