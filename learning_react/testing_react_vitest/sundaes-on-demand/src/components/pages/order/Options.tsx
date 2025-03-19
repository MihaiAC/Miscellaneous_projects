import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import { Scoop, OptionType } from "../../types/types";
import ToppingOption from "./ToppingOption";
import ErrorAlert from "../../ui/ErrorAlert";
import { ORDER_ENTRY_ALERT_MESSAGE, pricePerItem } from "../../../constants";
import { formatCurrency } from "../../../utils";
import { useOrderDetails } from "../../contexts/OrderDetailsContext";
import Header from "../../ui/Header";

interface OptionProps {
  optionType: OptionType;
}

export default function Options({ optionType }: OptionProps) {
  const [items, setItems] = useState<Scoop[]>([]);
  const [error, setError] = useState<boolean>(false);
  const { totals } = useOrderDetails();

  // TODO: Make a router loader do this instead of useEffect.
  // TODO: +test it.
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch(() => setError(true));
  }, [optionType]);

  if (error) {
    return <ErrorAlert errorMessage={ORDER_ENTRY_ALERT_MESSAGE} />;
  }

  const ItemComponent =
    optionType === OptionType.Scoops ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <div>
        {" "}
        <Header>Available {optionType}</Header>
        <p className="text-white font-thin text-2xl">
          {formatCurrency(pricePerItem[optionType])} each
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {optionItems}
      </div>
    </>
  );
}
