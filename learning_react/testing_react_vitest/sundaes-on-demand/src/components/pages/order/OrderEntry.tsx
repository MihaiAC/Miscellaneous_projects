import Options from "./Options";
import { OptionType } from "../../types/types";
import { useOrderDetails } from "../../contexts/OrderDetailsContext";
import { formatCurrency } from "../../../utils";
import { Link } from "react-router-dom";

export default function OrderEntry() {
  const { totals } = useOrderDetails();
  const grandTotal = Object.values(totals).reduce(
    (total, value) => total + value,
    0
  );

  const noScoopsSelected = totals.scoops === 0;

  return (
    <div className="flex flex-col space-y-32">
      <Options optionType={OptionType.Scoops} />
      <Options optionType={OptionType.Toppings} />
      <h1>Grand total: {formatCurrency(grandTotal)}</h1>
      <Link to="/summary">
        <button disabled={noScoopsSelected}>Checkout</button>
      </Link>
    </div>
  );
}
