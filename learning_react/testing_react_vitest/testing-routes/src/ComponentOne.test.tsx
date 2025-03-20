import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import routesConfig from "./routes";

test("redirects to ComponentTwo on CLICKME click", async () => {
  const router = createMemoryRouter(routesConfig, { initialEntries: ["/"] });
  render(<RouterProvider router={router} />);

  const clickmeBtn = screen.getByText("CLICKME");
  expect(clickmeBtn).toBeInTheDocument();

  await userEvent.click(clickmeBtn);

  const header = screen.getByText("Component Two");
  expect(header).toBeInTheDocument();
});
