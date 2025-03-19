export enum OptionType {
  Scoops = "scoops",
  Toppings = "toppings",
}

export type Scoop = {
  name: string;
  imagePath: string;
};

export type Topping = Scoop;

export type OptionItemMap = {
  [OptionType.Scoops]: Scoop;
  [OptionType.Toppings]: Topping;
};

export type OptionCounts = {
  [key in OptionType]: Record<string, number>;
};
