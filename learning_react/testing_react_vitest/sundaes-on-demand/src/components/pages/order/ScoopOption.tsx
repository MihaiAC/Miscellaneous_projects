import { OptionType, OptionData } from "../../../types";
import { useOrderDetails } from "../../contexts/OrderDetailsContext";
import { useState } from "react";

export default function ScoopOption({ name, imagePath }: OptionData) {
  const { updateItemCount } = useOrderDetails();
  const [isValid, setIsValid] = useState(true);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    const currentValue = parseFloat(event.target.value);
    const valueIsValid =
      0 <= currentValue &&
      currentValue <= 10 &&
      Math.floor(currentValue) === currentValue;

    setIsValid(valueIsValid);

    if (valueIsValid) {
      updateItemCount(
        name,
        parseInt(event.target.value, 10),
        OptionType.Scoops
      );
    } else {
      updateItemCount(name, 0, OptionType.Scoops);
    }
  }

  // TODO: Add styled Form component.
  return (
    <div className="flex justify-center items-center">
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
      <form onSubmit={(event) => event.preventDefault()}>
        <label htmlFor={`${name}-count`}>{name}</label>
        <input
          id={`${name}-count`}
          type="number"
          defaultValue={0}
          onChange={handleChange}
          className={isValid ? "input" : "input input-error"}
        />
      </form>
    </div>
  );
}
