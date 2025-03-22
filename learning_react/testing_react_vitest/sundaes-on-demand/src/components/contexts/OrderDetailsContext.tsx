import { createContext, ReactNode, useContext, useState } from "react";
import { OptionCounts, OptionType } from "../../types";
import { pricePerItem } from "../../constants";

interface OrderDetailsContextType {
  optionCounts: OptionCounts;
  totals: Record<OptionType, number>;
  updateItemCount: (
    itemName: string,
    newItemCount: number,
    optionType: OptionType
  ) => void;
  resetOrder: () => void;
}

const OrderDetails = createContext<OrderDetailsContextType | undefined>(
  undefined
);

// Custom hook to check we are in the provider.
export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be called from within an OrderDetailsProvider"
    );
  }

  return contextValue;
}

interface OrderDetailsProviderProps {
  children: ReactNode;
}

export function OrderDetailsProvider({ children }: OrderDetailsProviderProps) {
  // I should be iterating on all OptionTypes instead of hardcoding it again,
  // but that would be overengineering when we only have two types.
  const [optionCounts, setOptionCounts] = useState<OptionCounts>({
    [OptionType.Scoops]: {},
    [OptionType.Toppings]: {},
  });

  function updateItemCount(
    itemName: string,
    newItemCount: number,
    optionType: OptionType
  ) {
    // Copy existing state.
    const newOptionCounts = { ...optionCounts };

    // Modify itemName with newItemCount.
    // If it's 0, remove it.
    if (newItemCount === 0 && newOptionCounts[optionType]?.[itemName]) {
      delete newOptionCounts[optionType][itemName];
    } else if (newItemCount > 0) {
      newOptionCounts[optionType][itemName] = newItemCount;
    }

    setOptionCounts(newOptionCounts);
  }

  function resetOrder() {
    setOptionCounts({
      [OptionType.Scoops]: {},
      [OptionType.Toppings]: {},
    });
  }

  function calculateTotal(optionType: OptionType) {
    const countsArray = Object.values(optionCounts[optionType]);
    const totalCount = countsArray.reduce((total, value) => total + value, 0);
    return totalCount * pricePerItem[optionType];
  }

  const totals: Record<OptionType, number> = {
    [OptionType.Scoops]: calculateTotal(OptionType.Scoops),
    [OptionType.Toppings]: calculateTotal(OptionType.Toppings),
  };

  return (
    <OrderDetails.Provider
      value={{ optionCounts, totals, updateItemCount, resetOrder }}
    >
      {children}
    </OrderDetails.Provider>
  );
}
