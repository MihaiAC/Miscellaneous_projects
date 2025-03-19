import { render, screen } from "../../test-utils/testing-library-utils";
import {
  SAMPLE_SCOOPS,
  SAMPLE_TOPPINGS,
} from "../../test-utils/testingConstants";
import Options from "../pages/order/Options";
import { OptionType } from "../types/types";

test("displays image for each scoop option from server", async () => {
  // TODO: change this when testing routes.
  render(<Options optionType={OptionType.Scoops} />);

  // Get images.
  const scoopImages: HTMLImageElement[] = await screen.findAllByRole("img", {
    name: /scoop$/i,
  });
  expect(scoopImages).toHaveLength(2);

  // Confirm alt text of images.
  const altText = scoopImages.map((element) => element.alt);
  const scoopNames = SAMPLE_SCOOPS.map(({ name }) => `${name} scoop`);
  expect(altText).toEqual(scoopNames);
});

test("displays image for each topping option from server", async () => {
  render(<Options optionType={OptionType.Toppings} />);

  // Get images.
  const toppingImages: HTMLImageElement[] = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  // Confirm alt text of images.
  const altText = toppingImages.map((element) => element.alt);
  const toppingNames = SAMPLE_TOPPINGS.map(({ name }) => `${name} topping`);
  expect(altText).toEqual(toppingNames);
});
