export enum OptionType {
  Scoops = "scoops",
  Toppings = "toppings",
}

export type OptionData = {
  name: string;
  imagePath: string;
};

export type OptionCounts = {
  [key in OptionType]: Record<OptionData["name"], number>;
};
