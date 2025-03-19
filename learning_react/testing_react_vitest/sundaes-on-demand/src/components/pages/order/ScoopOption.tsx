import { OptionType, Scoop } from "../../types/types";
import { useOrderDetails } from "../../contexts/OrderDetailsContext";

export default function ScoopOption({ name, imagePath }: Scoop) {
  const { updateItemCount } = useOrderDetails();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateItemCount(name, parseInt(event.target.value, 10), OptionType.Scoops);
  }

  // TODO: Add styled Form component.
  // TODO: ScoopOption and ToppingOption are not sufficiently different.
  return (
    <div className="flex justify-center items-center">
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} scoop`} />
      <form>
        <label htmlFor={`${name}-count`}>{name}</label>
        <input
          id={`${name}-count`}
          type="number"
          defaultValue={0}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
