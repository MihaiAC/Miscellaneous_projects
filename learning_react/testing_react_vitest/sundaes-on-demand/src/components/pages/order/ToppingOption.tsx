import { useOrderDetails } from "../../contexts/OrderDetailsContext";
import { OptionType, Topping } from "../../types/types";

export default function ToppingOption({ name, imagePath }: Topping) {
  const { updateItemCount } = useOrderDetails();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateItemCount(name, event.target.checked ? 1 : 0, OptionType.Toppings);
  }

  return (
    <div className="flex justify-center items-center">
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
      <div>
        <label htmlFor={`${name}-topping-checkbox`}>{name}</label>
        <input
          id={`${name}-topping-checkbox`}
          type="checkbox"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
