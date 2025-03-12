import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Greeting from "./Greeting";

describe("Greeting component", () => {
  test("renders Hello World as text", () => {
    render(<Greeting />);
    const helloWorldElement = screen.getByText("Hello World", { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders before changing text", () => {
    render(<Greeting></Greeting>);

    const outputElement = screen.getByText("Text was not changed.");
    expect(outputElement).toBeInTheDocument();
  });

  test("renders after changing text", () => {
    render(<Greeting></Greeting>);

    // Click button.
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    const outputElement = screen.getByText("Text was changed.");
    expect(outputElement).toBeInTheDocument();
  });

  test("does not render initial text after pressing button", () => {
    render(<Greeting></Greeting>);

    // Click button.
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    const outputElement = screen.queryByText("Text was not changed.", {
      exact: false,
    });
    expect(outputElement).toBeNull();
  });
});
