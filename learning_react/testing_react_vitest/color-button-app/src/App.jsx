import { useState } from "react";
import "./App.css";

function App() {
  const [btnToggled, setBtnToggled] = useState(false);
  const [checkboxToggled, setCheckBoxToggled] = useState(false);
  const btnText = btnToggled ? "Change to red" : "Change to blue";

  let btnClassName = "btn ";
  if (checkboxToggled) {
    btnClassName += "bg-gray-400";
  } else if (!btnToggled) {
    btnClassName += "bg-red-400";
  } else {
    btnClassName += "bg-blue-400";
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
