import { render, RenderOptions } from "@testing-library/react";
import { OrderDetailsProvider } from "../components/contexts/OrderDetailsContext";
import { ReactElement } from "react";

function renderWithOrderDetailsContext(
  ui: ReactElement,
  options?: RenderOptions
) {
  render(ui, { wrapper: OrderDetailsProvider, ...options });
}

export * from "@testing-library/react";

// Override render method.
export { renderWithOrderDetailsContext as render };
