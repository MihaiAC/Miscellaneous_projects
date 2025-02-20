import Input from "./components/Input";
import Header from "./components/Header";
import Result from "./components/Result";
import { useState } from "react";
import InputData from "./util/InputData";

function App() {
  const [data, setData] = useState(new InputData());

  function handleInput(inputData) {
    setData(inputData);
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
