import { useState } from "react";
import "./App.css";

function App() {
  const [btnToggled, setBtnToggled] = useState(false);
  const [checkboxToggled, setCheckBoxToggled] = useState(false);

  let btnClassName = "btn ";
  let btnText = "Change to ";
  if (!btnToggled) {
    btnClassName += "bg-red-400";
    btnText += "blue";
  } else {
    btnClassName += "bg-blue-400";
    btnText += "red";
  }

  function handleButtonClick() {
    if (!checkboxToggled) {
      setBtnToggled((state) => !state);
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <button
        className={btnClassName}
        onClick={handleButtonClick}
        disabled={checkboxToggled}
      >
        {btnText}
      </button>
      ;
      <div className="flex flex-col-reverse">
        <input
          type="checkbox"
          id="disable-button-checkbox"
          defaultChecked={false}
          onChange={() => setCheckBoxToggled((state) => !state)}
        />
        <label htmlFor="disable-button-checkbox">Disable button</label>
      </div>
    </div>
  );
}

export default App;
