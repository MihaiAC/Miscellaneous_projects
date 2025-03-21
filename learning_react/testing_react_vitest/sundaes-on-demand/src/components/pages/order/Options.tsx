import ScoopOption from "./ScoopOption";
import { Option, OptionType } from "../../types/types";
import ToppingOption from "./ToppingOption";
import ErrorAlert from "../../ui/ErrorAlert";
import { ORDER_ENTRY_ALERT_MESSAGE, pricePerItem } from "../../../constants";
import { formatCurrency } from "../../../utils";
import { useOrderDetails } from "../../contexts/OrderDetailsContext";
import { useQuery } from "@tanstack/react-query";
import { fetchOptions } from "../../../queries";

interface OptionProps {
  optionType: OptionType;
}

export default function Options({ optionType }: OptionProps) {
  const {
    data: items,
    isLoading,
    isError,
  } = useQuery<Option[]>({
    queryKey: ["options", optionType],
    queryFn: () => fetchOptions(optionType),
  });

  const { totals } = useOrderDetails();

  if (isError) {
    return <ErrorAlert errorMessage={ORDER_ENTRY_ALERT_MESSAGE} />;
  }

  // TODO: Add loading visual element.
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const ItemComponent =
    optionType === OptionType.Scoops ? ScoopOption : ToppingOption;

  let optionItems = undefined;
  if (items) {
    optionItems = items.map((item) => (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    ));
  }

  return (
    <>
      <div>
        {" "}
        <h1>Available {optionType}</h1>
        <p className="text-white font-thin text-2xl">
          {formatCurrency(pricePerItem[optionType])} each
        </p>
        <p>
          {optionType} total: {formatCurrency(totals[optionType])}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {optionItems}
      </div>
    </>
  );
}
