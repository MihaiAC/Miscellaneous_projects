import { useOrderDetails } from "../../contexts/OrderDetailsContext";
import { OptionType, OptionData } from "../../../types";

export default function ToppingOption({ name, imagePath }: OptionData) {
  const { updateItemCount } = useOrderDetails();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateItemCount(name, event.target.checked ? 1 : 0, OptionType.Toppings);
  }

  return (
    <div className="item-component-container">
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
      <div className="item-component-form">
        <label htmlFor={`${name}-topping-checkbox`}>{name}</label>
        <input
          id={`${name}-topping-checkbox`}
          type="checkbox"
          onChange={handleChange}
          className="checkbox checkbox-primary"
        />
      </div>
    </div>
  );
}
