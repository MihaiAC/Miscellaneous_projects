import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("button click flow", async () => {
  render(<App />);
  const btnElement = screen.getByRole("button", { name: /blue/i });
  expect(btnElement).toHaveClass("bg-red-400", "btn");
  await userEvent.click(btnElement);
  expect(btnElement).toHaveClass("bg-blue-400");
  expect(btnElement).toHaveTextContent("Change to red");
});

test("checkbox flow", async () => {
  // Render the app.
  render(<App />);

  // Get the checkbox and the button elements.
  const checkboxElement = screen.getByRole("checkbox", {
    name: /disable button/i,
  });
  const btnElement = screen.getByRole("button", { name: /blue/i });

  // Check default state.
  expect(checkboxElement).not.toBeChecked();
  expect(btnElement).not.toBeDisabled();

  // Click the checkbox.
  await userEvent.click(checkboxElement);

  // Button should be disabled after first checkbox click.
  expect(checkboxElement).toBeChecked();
  expect(btnElement).toBeDisabled();

  // When disabled, button should be gray.
  expect(btnElement).toHaveClass("bg-gray-400");

  // Buton should be re-enabled after second checkbox click.
  await userEvent.click(checkboxElement);
  expect(btnElement).not.toBeDisabled();

  // Check that the button's color is back to red.
  expect(btnElement).toHaveClass("bg-red-400");
});
