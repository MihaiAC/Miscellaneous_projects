import { render, screen } from "@testing-library/react";
import App from "./App";

test("button starts with correct color", () => {
  render(<App />);
  const btnElement = screen.getByRole("button", { name: /blue/i });
  expect(btnElement).toHaveClass("bg-red-400", "btn");
});
test("button starts with correct text", () => {});
test("button has correct color after click", () => {});
test("button has correct text after click", () => {});
