export type Scoop = {
  name: string;
  // Should be of type URL, but good enough here.
  imagePath: string;
};

export type Topping = Scoop;
