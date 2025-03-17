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
