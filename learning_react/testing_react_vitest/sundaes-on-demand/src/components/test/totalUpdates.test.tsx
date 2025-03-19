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
import OrderEntry from "../pages/order/OrderEntry";

// TODO: add test + functionality for negative number of scoops.
// TODO: add test + functionality for ensuring the user has input an integer.
test("check that our samples have the expected number of elements", () => {
  // Assert that SAMPLE_TOPPINGS has length at least 2.
  expect(SAMPLE_TOPPINGS.length).toBeGreaterThanOrEqual(2);

  // Assert that SAMPLE_SCOOPS has length at least 2.
  expect(SAMPLE_TOPPINGS.length).toBeGreaterThanOrEqual(2);
});

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

describe("grand total", () => {
  let grandTotal: HTMLElement;
  let scoopInput: HTMLInputElement;
  let toppingCheckbox: HTMLInputElement;
  const scoopName = SAMPLE_SCOOPS[0].name;
  const toppingName = SAMPLE_TOPPINGS[0].name;

  beforeEach(async () => {
    // eslint-disable-next-line testing-library/no-render-in-lifecycle
    render(<OrderEntry />);
    grandTotal = screen.getByRole("heading", { name: /^Grand total:/ });
    scoopInput = await screen.findByRole("spinbutton", {
      name: scoopName,
    });
    toppingCheckbox = await screen.findByRole("checkbox", {
      name: toppingName,
    });
  });

  test("grand total starts at $0.00", () => {
    expect(grandTotal).toHaveTextContent("0.00");
  });

  test("grand total updates properly if scoop is added first", async () => {
    let currentTotal = 0;

    // Add two scoops, check total.
    await userEvent.clear(scoopInput);
    await userEvent.type(scoopInput, "2");
    currentTotal += 2 * pricePerItem[OptionType.Scoops];
    expect(grandTotal).toHaveTextContent(formatCurrency(currentTotal));

    // Add a topping, check total.
    await userEvent.click(toppingCheckbox);
    currentTotal += pricePerItem[OptionType.Toppings];
    expect(grandTotal).toHaveTextContent(formatCurrency(currentTotal));
  });

  test("grand total updates properly if topping is added first", async () => {
    let currentTotal = 0;

    // Add a topping, check total.
    await userEvent.click(toppingCheckbox);
    currentTotal += pricePerItem[OptionType.Toppings];
    expect(grandTotal).toHaveTextContent(formatCurrency(currentTotal));

    // Add two scoops, check total.
    await userEvent.clear(scoopInput);
    await userEvent.type(scoopInput, "2");
    currentTotal += 2 * pricePerItem[OptionType.Scoops];
    expect(grandTotal).toHaveTextContent(formatCurrency(currentTotal));
  });

  test("grand total updates properly if item is removed", async () => {
    let currentTotal = 0;

    // Add two scoops, check total.
    await userEvent.clear(scoopInput);
    await userEvent.type(scoopInput, "2");
    currentTotal += 2 * pricePerItem[OptionType.Scoops];
    expect(grandTotal).toHaveTextContent(formatCurrency(currentTotal));

    // Add a topping, check total.
    await userEvent.click(toppingCheckbox);
    currentTotal += pricePerItem[OptionType.Toppings];
    expect(grandTotal).toHaveTextContent(formatCurrency(currentTotal));

    // Remove a scoop, check total.
    await userEvent.clear(scoopInput);
    await userEvent.type(scoopInput, "1");
    currentTotal -= pricePerItem[OptionType.Scoops];
    expect(grandTotal).toHaveTextContent(formatCurrency(currentTotal));

    // Remove topping, check total.
    await userEvent.click(toppingCheckbox);
    currentTotal -= pricePerItem[OptionType.Toppings];
    expect(grandTotal).toHaveTextContent(formatCurrency(currentTotal));
  });
});
