import { useState, useRef } from "react";
import Popover from "../../ui/Popover";
import { Link } from "react-router-dom";

export default function SummaryForm() {
  const [isChecked, setIsChecked] = useState(false);
  const formRef = useRef<null | HTMLFormElement>(null);

  function handleCheckboxChange() {
    setIsChecked((state) => !state);
  }

  return (
    <div className="flex-vert">
      <form className="flex-vert" ref={formRef}>
        {" "}
        <label htmlFor="confirm-order-checkbox">Terms and conditions</label>
        <input
          type="checkbox"
          id="confirm-order-checkbox"
          onChange={handleCheckboxChange}
        />
      </form>

      <Popover targetRef={formRef}>
        <p>Nothing will be actually delivered!</p>
      </Popover>

      <div>
        <Link to="/confirmation">
          <button
            disabled={!isChecked}
            className="bg-red-400 disabled:bg-gray-400 p-2 rounded-md hover:opacity-90"
          >
            Confirm order
          </button>
        </Link>
      </div>
    </div>
  );
}
