import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import Popover from "../../ui/Popover";

export default function SummaryForm() {
  const [isChecked, setIsChecked] = useState(false);
  const formRef = useRef<null | HTMLFormElement>(null);

  function handleCheckboxChange() {
    setIsChecked((state) => !state);
  }

  return (
    <div className="flex-vert">
      <form className="summary-checkbox-form" ref={formRef}>
        {" "}
        <label htmlFor="confirm-order-checkbox">Terms and conditions</label>
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          id="confirm-order-checkbox"
          onChange={handleCheckboxChange}
        />
      </form>

      <Popover targetRef={formRef}>
        <p>Nothing will actually be delivered!</p>
      </Popover>

      <div>
        <Link to="/confirmation">
          <Button disabled={!isChecked}>Confirm order</Button>
        </Link>
      </div>
    </div>
  );
}
