import { OptionType, OptionData } from "../../../types";
import { useOrderDetails } from "../../contexts/OrderDetailsContext";
import { useState } from "react";
import clsx from "clsx";

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

  return (
    <div className="item-component-container">
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
      <form
        onSubmit={(event) => event.preventDefault()}
        className="item-component-form"
      >
        <label htmlFor={`${name}-count`}>{name}</label>
        <input
          id={`${name}-count`}
          type="number"
          defaultValue={0}
          onChange={handleChange}
          className={clsx("input max-w-20", { "input-error": !isValid })}
        />
      </form>
    </div>
  );
}
