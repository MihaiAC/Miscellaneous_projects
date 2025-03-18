import { useState } from "react";

export default function SummaryForm() {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheckboxChange() {
    setIsChecked((state) => !state);
  }

  return (
    <div className="flex flex-col space-y-4">
      <label htmlFor="confirm-order-checkbox">Terms and conditions</label>
      <input
        type="checkbox"
        id="confirm-order-checkbox"
        onChange={handleCheckboxChange}
      />
      <div>
        <button
          disabled={!isChecked}
          className="bg-red-400 disabled:bg-gray-400 p-2 rounded-md hover:opacity-90"
        >
          Confirm order
        </button>
      </div>
    </div>
  );
}
