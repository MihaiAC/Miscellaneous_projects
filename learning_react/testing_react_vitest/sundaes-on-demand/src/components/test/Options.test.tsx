import { render, screen } from "@testing-library/react";
import { SAMPLE_SCOOPS, SAMPLE_TOPPINGS } from "./testingConstants";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

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

// Don't really like hardcoded values, in practice should import
// from a test config file.
test("displays image for each topping option from server", async () => {
  render(<Options optionType="toppings" />);

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
