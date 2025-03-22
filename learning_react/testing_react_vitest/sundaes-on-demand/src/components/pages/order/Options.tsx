import ScoopOption from "./ScoopOption";
import { OptionData, OptionType } from "../../../types";
import ToppingOption from "./ToppingOption";
import ErrorAlert from "../../ui/ErrorAlert";
import { ORDER_ENTRY_ALERT_MESSAGE, pricePerItem } from "../../../constants";
import { formatCurrency } from "../../../utils";
import { useOrderDetails } from "../../contexts/OrderDetailsContext";
import { useQuery } from "@tanstack/react-query";
import { fetchOptions } from "../../../queries";
import Loading from "../../ui/Loading";

interface OptionProps {
  optionType: OptionType;
}

export default function Options({ optionType }: OptionProps) {
  const {
    data: items,
    isLoading,
    isError,
  } = useQuery<OptionData[]>({
    queryKey: ["options", optionType],
    queryFn: () => fetchOptions(optionType),
  });

  const { totals } = useOrderDetails();

  if (isError) {
    return <ErrorAlert errorMessage={ORDER_ENTRY_ALERT_MESSAGE} />;
  }

  if (isLoading) {
    return <Loading />;
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
      <div className="options-header">
        {" "}
        <h1>Available {optionType}</h1>
        <p className="price">{formatCurrency(pricePerItem[optionType])} each</p>
        <p>
          {optionType} total: {formatCurrency(totals[optionType])}
        </p>
      </div>

      <div className="options-content">{optionItems}</div>
    </>
  );
}
