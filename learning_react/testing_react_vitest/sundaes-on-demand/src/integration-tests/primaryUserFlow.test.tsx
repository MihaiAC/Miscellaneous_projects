import userEvent from "@testing-library/user-event";
import { appRoutes } from "../router/routerConfig";
import { render, screen } from "../test-utils/testing-library-utils";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import {
  SAMPLE_SCOOPS,
  SAMPLE_TOPPINGS,
  CONFIRMATION_RESPONSE,
} from "../test-utils/testingConstants";
import { pricePerItem } from "../constants";
import { OptionType } from "../components/types/types";
import { formatCurrencyNoSign } from "../utils";

test("order phases for primary user flow", async () => {
  // Create user.
  const user = userEvent.setup();

  // Create router.
  const router = createMemoryRouter(appRoutes, {
    initialEntries: ["/"],
  });

  // Render app.
  render(<RouterProvider router={router} />);

  // Add scoops and toppings.
  const scoopName = SAMPLE_SCOOPS[0].name;
  const scoopInput = await screen.findByRole("spinbutton", {
    name: scoopName,
  });
  await user.type(scoopInput, "2");
  const scoopTotal = 2 * pricePerItem[OptionType.Scoops];

  const toppingName = SAMPLE_TOPPINGS[0].name;
  const toppingCheckbox = await screen.findByRole("checkbox", {
    name: toppingName,
  });
  await user.click(toppingCheckbox);
  const toppingsTotal = pricePerItem[OptionType.Toppings];

  // Find and click order button.
  const checkoutLink = await screen.findByRole("link", { name: /Checkout/i });
  await user.click(checkoutLink);

  // Check successful redirection.
  const summaryHeading = screen.getByRole("heading", {
    name: /Order Summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();

  // Check summary information based on order.
  const scoopsHeading = screen.getByRole("heading", {
    name: new RegExp(`scoops.*${formatCurrencyNoSign(scoopTotal)}`, "i"),
  });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: new RegExp(`toppings.*${formatCurrencyNoSign(toppingsTotal)}`, "i"),
  });
  expect(toppingsHeading).toBeInTheDocument();

  // Accept T&Cs and click button to confirm order.
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(confirmOrderButton);

  // Expect "loading" message to show.
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // Confirm order number on confirmation page.
  const confirmationHeader = await screen.findByText(
    new RegExp(`confirmation number.*${CONFIRMATION_RESPONSE.orderNumber}`, "i")
  );
  expect(confirmationHeader).toBeInTheDocument();

  // Expect loading message to be gone.
  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();

  // Click "New order" button on confirmation page.
  const newOrderBtn = screen.getByRole("button", { name: /new order/i });
  await user.click(newOrderBtn);

  // Check that scoops and toppings subtotals have been reset.
  const resetScoopsTotal = await screen.findByText(
    new RegExp(`scoops.*${formatCurrencyNoSign(0)}`, "i")
  );
  expect(resetScoopsTotal).toBeInTheDocument();

  const resetToppingsTotal = await screen.findByText(
    new RegExp(`toppings.*${formatCurrencyNoSign(0)}`, "i")
  );
  expect(resetToppingsTotal).toBeInTheDocument();
});
