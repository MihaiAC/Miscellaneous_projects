import Options from "./Options";
import { OptionType } from "../../../types";
import { useOrderDetails } from "../../contexts/OrderDetailsContext";
import { formatCurrency } from "../../../utils";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";

export default function OrderEntry() {
  const { totals } = useOrderDetails();
  const grandTotal = Object.values(totals).reduce(
    (total, value) => total + value,
    0
  );

  const noScoopsSelected = totals.scoops === 0;

  return (
    <div className="page-container">
      <Options optionType={OptionType.Scoops} />
      <Options optionType={OptionType.Toppings} />
      <h1 className="text-center mb-8">
        Grand total: {formatCurrency(grandTotal)}
      </h1>
      <Link to="/summary" className="flex flex-col items-center">
        <Button disabled={noScoopsSelected}>Checkout</Button>
      </Link>
    </div>
  );
}
