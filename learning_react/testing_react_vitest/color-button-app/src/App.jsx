import { useState } from "react";
import "./App.css";

function App() {
  const [toggled, setToggled] = useState(false);

  let btnElement;
  if (!toggled) {
    btnElement = <button className={"btn bg-red-400"}>Change to blue</button>;
  } else {
    btnElement = <button className={"btn bg-blue-400"}>Change to red</button>;
  }

  return <div onClick={() => setToggled((state) => !state)}>{btnElement}</div>;
}

export default App;
