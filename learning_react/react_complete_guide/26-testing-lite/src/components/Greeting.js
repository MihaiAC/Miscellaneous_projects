import { useState } from "react";
import Output from "./Output";

export default function Greeting() {
  const [changedText, setChangedText] = useState(false);

  function changeTextHandler() {
    setChangedText(true);
  }

  return (
    <div>
      <h2>Hello world</h2>
      {!changedText && <Output>Text was not changed.</Output>}
      {changedText && <Output>Text was changed.</Output>}
      <p>Good to see you</p>
      <button onClick={changeTextHandler}>Change text!</button>
    </div>
  );
}
