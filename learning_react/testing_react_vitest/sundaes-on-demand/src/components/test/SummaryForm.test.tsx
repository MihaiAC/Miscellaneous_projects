import SummaryForm from "../pages/summary/SummaryForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const CHECKBOX_LABEL = /terms and conditions/i;
const BUTTON_TEXT = /confirm order/i;
const POPOVER_TEXT = /nothing will be actually delivered/i;

test("Initial conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: CHECKBOX_LABEL,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: BUTTON_TEXT });
  expect(confirmButton).toBeDisabled();
});

test("Checkbox enables button on first click, disables on second", async () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: CHECKBOX_LABEL,
  });
  const confirmButton = screen.getByRole("button", { name: BUTTON_TEXT });

  await userEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  await userEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("Popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // Popover starts out hidden.
  const nullPopover = screen.queryByText(POPOVER_TEXT);
  expect(nullPopover).not.toBeInTheDocument();

  // Popover appears on mouseover of checkbox label.
  const checkboxLabel = screen.getByText(CHECKBOX_LABEL);
  await user.hover(checkboxLabel);

  const popover = screen.getByText(POPOVER_TEXT);
  expect(popover).toBeInTheDocument();

  // Popover disappears when mouse moves away.
  await user.unhover(checkboxLabel);
  expect(popover).not.toBeInTheDocument();
});
