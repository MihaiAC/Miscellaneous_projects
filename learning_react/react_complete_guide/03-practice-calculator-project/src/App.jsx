import Input from "./components/Input";
import Header from "./components/Header";
import Result from "./components/Result";
import { useEffect, useState } from "react";
import InputData from "./util/InputData";

function App() {
  const [data, setData] = useState(new InputData());

  useEffect(() => {}, [data]); // Runs whenever 'data' changes

  function handleInput(inputData) {
    console.log("Received data: " + inputData.duration);
    setData((prevData) => {
      let newData = InputData.newFromInputData(inputData);
      return newData;
    });
  }

  return (
    <>
      <Header />
      <Input onValidAction={handleInput} />
      <Result data={data} />
    </>
  );
}

export default App;
