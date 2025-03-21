import userEvent from "@testing-library/user-event";
import { render, screen } from "../test-utils/testing-library-utils";
import { SAMPLE_SCOOPS, SAMPLE_TOPPINGS } from "../test-utils/testingConstants";
import { pricePerItem } from "../constants";
import { OptionType } from "../components/types/types";
import { formatCurrencyNoSign } from "../utils";
import { appRoutes } from "../router/routerConfig";

test("topping section not displayed if no toppings were selected", async () => {
  const routerOpts = {
    initialEntries: ["/"],
  };

  // Render app.
  render(appRoutes, routerOpts);

  // Init user.
  const user = userEvent.setup();

  // Add scoops and toppings.
  const scoopName = SAMPLE_SCOOPS[0].name;
  const scoopInput = await screen.findByRole("spinbutton", {
    name: scoopName,
  });
  await user.type(scoopInput, "2");
  const scoopTotal = 2 * pricePerItem[OptionType.Scoops];

  // Find and click order button.
  const checkoutLink = await screen.findByRole("link", { name: /Checkout/i });
  await user.click(checkoutLink);

  // Check successful redirection.
  const summaryHeading = screen.getByRole("heading", {
    name: /Order Summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();

  // Scoop summary should be present.
  const scoopsHeading = screen.getByRole("heading", {
    name: new RegExp(`scoops.*${formatCurrencyNoSign(scoopTotal)}`, "i"),
  });
  expect(scoopsHeading).toBeInTheDocument();

  // There shouldn't be a toppings summary.
  const toppingsHeading = screen.queryByRole("heading", {
    name: /toppings/i,
  });
  expect(toppingsHeading).not.toBeInTheDocument();
});

test("topping section not displayed if user selects then de-selects topping", async () => {
  const routerOpts = {
    initialEntries: ["/"],
  };

  // Render app.
  render(appRoutes, routerOpts);

  // Init user.
  const user = userEvent.setup();

  // Add scoops and toppings.
  const scoopName = SAMPLE_SCOOPS[0].name;
  const scoopInput = await screen.findByRole("spinbutton", {
    name: scoopName,
  });
  await user.type(scoopInput, "2");
  const scoopTotal = 2 * pricePerItem[OptionType.Scoops];

  // User selects a topping.
  const toppingName = SAMPLE_TOPPINGS[0].name;
  const toppingCheckbox = await screen.findByRole("checkbox", {
    name: toppingName,
  });
  await user.click(toppingCheckbox);

  // User changes their mind and de-selects the topping.
  await user.click(toppingCheckbox);
  expect(toppingCheckbox).not.toBeChecked();

  // Find and click order button.
  const checkoutLink = await screen.findByRole("link", { name: /Checkout/i });
  await user.click(checkoutLink);

  // Check successful redirection.
  const summaryHeading = screen.getByRole("heading", {
    name: /Order Summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();

  // Scoop summary should be present.
  const scoopsHeading = screen.getByRole("heading", {
    name: new RegExp(`scoops.*${formatCurrencyNoSign(scoopTotal)}`, "i"),
  });
  expect(scoopsHeading).toBeInTheDocument();

  // There shouldn't be a toppings summary.
  const toppingsHeading = screen.queryByRole("heading", {
    name: /toppings/i,
  });
  expect(toppingsHeading).not.toBeInTheDocument();
});
