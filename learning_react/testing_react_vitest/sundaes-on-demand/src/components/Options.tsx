import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import { Scoop } from "./types/types";
import ToppingOption from "./ToppingOption";
import ErrorAlert from "./ui/ErrorAlert";
import { ORDER_ENTRY_ALERT_MESSAGE } from "../constants";

interface OptionProps {
  optionType: string;
}

export default function Options({ optionType }: OptionProps) {
  const [items, setItems] = useState<Scoop[]>([]);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch(() => setError(true));
  }, [optionType]);

  if (error) {
    return <ErrorAlert errorMessage={ORDER_ENTRY_ALERT_MESSAGE} />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <h1 className="text-6xl font-semibold text-white text-center">
        Available {optionType}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {optionItems}
      </div>
    </>
  );
}
