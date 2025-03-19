import Options from "./Options";
import { OptionType } from "../../types/types";
import { useOrderDetails } from "../../contexts/OrderDetailsContext";
import Header from "../../ui/Header";
import { formatCurrency } from "../../../utils";

export default function OrderEntry() {
  const { totals } = useOrderDetails();
  const grandTotal = Object.values(totals).reduce(
    (total, value) => total + value,
    0
  );

  return (
    <div className="flex flex-col space-y-32">
      <Options optionType={OptionType.Scoops} />
      <Options optionType={OptionType.Toppings} />
      <Header>Grand total: {formatCurrency(grandTotal)}</Header>
    </div>
  );
}
