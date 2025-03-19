import Options from "./Options";
import { OptionType } from "../../types/types";

export default function OrderEntry() {
  return (
    <div className="flex flex-col space-y-32">
      <Options optionType={OptionType.Scoops} />
      <Options optionType={OptionType.Toppings} />
    </div>
  );
}
