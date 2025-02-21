import Input from "./components/Input";
import Header from "./components/Header";
import Result from "./components/Result";
import { useState } from "react";
import InputData from "./util/InputData";
import { calculateInvestmentResults } from "./util/investment";

function App() {
  const [data, setData] = useState(new InputData());

  function handleInputChange(inputData) {
    setData(() => {
      let newData = InputData.newFromInputData(inputData);
      return newData;
    });
  }

  let investmentResults = null;
  if (data.isValid()) {
    investmentResults = calculateInvestmentResults(data);
  }

  return (
    <>
      <Header />
      <Input data={data} onInputChange={handleInputChange} />
      <Result data={investmentResults} />
    </>
  );
}

export default App;
