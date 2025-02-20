import { calculateInvestmentResults, formatter } from "./util/investment";
import Input from "./components/Input";

function App() {
  function handleInput(currentVals) {
    console.log(currentVals);
  }

  return (
    <>
      <div id="header">
        <img src="/investment-calculator-logo.png" alt="" />
        <h1>Investment Calculator</h1>
      </div>
      <Input onValidAction={handleInput}></Input>
    </>
  );
}

export default App;
