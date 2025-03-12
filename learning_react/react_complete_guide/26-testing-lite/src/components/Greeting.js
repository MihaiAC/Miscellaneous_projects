import { useState } from "react";

export default function Greeting() {
  const [changedText, setChangedText] = useState(false);

  function changeTextHandler() {
    setChangedText(true);
  }

  return (
    <div>
      <h2>Hello world</h2>
      {!changedText && <p>Text was not changed.</p>}
      {changedText && <p>Text was changed.</p>}
      <p>Good to see you</p>
      <button onClick={changeTextHandler}>Change text!</button>
    </div>
  );
}
