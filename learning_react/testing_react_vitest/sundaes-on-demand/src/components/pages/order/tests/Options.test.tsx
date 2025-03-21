import { render, screen } from "../../../../test-utils/testing-library-utils";
import {
  SAMPLE_SCOOPS,
  SAMPLE_TOPPINGS,
} from "../../../../test-utils/testingConstants";
import Options from "../Options";
import { OptionType } from "../../../types/types";
import userEvent from "@testing-library/user-event";
import { formatCurrencyNoSign } from "../../../../utils";
import { pricePerItem } from "../../../../constants";

const routerOpts = {
  initialEntries: ["/"],
};

const scoopRoutes = [
  { path: "/", element: <Options optionType={OptionType.Scoops} /> },
];

const toppingRoutes = [
  { path: "/", element: <Options optionType={OptionType.Toppings} /> },
];

test("displays image for each scoop option from server", async () => {
  render(scoopRoutes, routerOpts);

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
  render(toppingRoutes, routerOpts);

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

test("total is not updated if scoops input is invalid", async () => {
  // Setup.
  const user = userEvent.setup();
  render(scoopRoutes, routerOpts);

  // Retrieve scoops total, ensure it's 0.
  // TODO: Same regexp used in two different test files.
  const scoopsHeading = await screen.findByText(
    new RegExp(`scoops.*${formatCurrencyNoSign(0)}`, "i")
  );
  expect(scoopsHeading).toBeInTheDocument();

  // Get scoop input element and input an invalid value.
  const scoopName = SAMPLE_SCOOPS[0].name;
  const scoopInput = await screen.findByRole("spinbutton", {
    name: scoopName,
  });
  await user.clear(scoopInput);
  await user.type(scoopInput, "2.5");
  expect(scoopsHeading).toHaveTextContent("0.00");

  // Get second scoop input element and input a valid value.
  const secondScoopName = SAMPLE_SCOOPS[1].name;
  const secondScoopInput = await screen.findByRole("spinbutton", {
    name: secondScoopName,
  });
  await user.clear(secondScoopInput);
  await user.type(secondScoopInput, "1");
  expect(scoopsHeading).toHaveTextContent(
    formatCurrencyNoSign(pricePerItem[OptionType.Scoops])
  );

  // Input another invalid value.
  await user.clear(scoopInput);
  await user.type(scoopInput, "100");
  expect(scoopsHeading).toHaveTextContent(
    formatCurrencyNoSign(pricePerItem[OptionType.Scoops])
  );
});
