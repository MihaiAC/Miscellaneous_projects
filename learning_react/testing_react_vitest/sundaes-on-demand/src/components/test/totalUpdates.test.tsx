import { render, screen } from "../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../pages/order/Options";
import {
  SAMPLE_SCOOPS,
  SAMPLE_TOPPINGS,
} from "../../test-utils/testingConstants";
import { pricePerItem } from "../../constants";
import { OptionType } from "../types/types";
import { formatCurrency } from "../../utils";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType={OptionType.Scoops} />);

  // Make sure total starts out at $0.00.
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  let runningTotal = 0;
  for (const [idx, { name }] of SAMPLE_SCOOPS.entries()) {
    const quantity = idx + 1;

    const input = await screen.findByRole("spinbutton", {
      name: new RegExp(`^${name}$`, "i"),
    });

    await user.clear(input);
    await user.type(input, quantity.toString());

    runningTotal += pricePerItem[OptionType.Scoops] * quantity;

    expect(scoopsSubtotal).toHaveTextContent(runningTotal.toFixed(2));
  }
});

test("update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType={OptionType.Toppings} />);

  // Assert total starts at 0.
  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");

  // Assert that SAMPLE_TOPPINGS has length at least 2.
  expect(SAMPLE_TOPPINGS.length).toBeGreaterThanOrEqual(2);

  // Extract two topping names.
  const firstToppingName = SAMPLE_TOPPINGS[0].name;
  const secondToppingName = SAMPLE_TOPPINGS[1].name;
  const toppingPrice = pricePerItem[OptionType.Toppings];

  // Add topping one and check subtotal.
  const firstToppingCheckbox = await screen.findByRole("checkbox", {
    name: firstToppingName,
  });
  await user.click(firstToppingCheckbox);
  expect(toppingsTotal).toHaveTextContent(formatCurrency(toppingPrice));

  // Add topping two and check subtotal.
  const secondToppingCheckbox = await screen.findByRole("checkbox", {
    name: secondToppingName,
  });
  await user.click(secondToppingCheckbox);
  expect(toppingsTotal).toHaveTextContent(formatCurrency(toppingPrice * 2));

  // Remove first topping and check subtotal.
  await user.click(firstToppingCheckbox);
  expect(toppingsTotal).toHaveTextContent(formatCurrency(toppingPrice));

  // Remove second topping and check subtotal is back to 0.
  // For potential rounding errors.
  await user.click(secondToppingCheckbox);
  expect(toppingsTotal).toHaveTextContent("0.00");
});
