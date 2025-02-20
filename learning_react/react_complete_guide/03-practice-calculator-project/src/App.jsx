import { calculateInvestmentResults, formatter } from "./util/investment";
import Input from "./components/Input";
import Header from "./components/Header";

function App() {
  function handleInput(currentVals) {
    console.log(currentVals);
  }

  return (
    <>
      <Header />
      <Input onValidAction={handleInput}></Input>
    </>
  );
}

export default App;
