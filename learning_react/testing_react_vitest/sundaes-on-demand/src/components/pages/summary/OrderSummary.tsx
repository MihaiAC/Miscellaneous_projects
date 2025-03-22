import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetailsContext";
import { formatCurrency } from "../../../utils";

export default function OrderSummary() {
  const { totals, optionCounts } = useOrderDetails();

  const scoopList = Object.entries(optionCounts.scoops).map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasToppings = totals.toppings > 0;
  console.log(totals.toppings);

  const toppingList = Object.keys(optionCounts.toppings).map((key) => (
    <li key={key}>{key}</li>
  ));

  return (
    <div className="page-container flex-vert space-y-8">
      <h1>Order summary</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopList}</ul>
      {hasToppings && <h2>Toppings: {formatCurrency(totals.toppings)}</h2>}
      {hasToppings && <ul>{toppingList}</ul>}
      <SummaryForm />
    </div>
  );
}
