import { render, RenderOptions } from "@testing-library/react";
import { OrderDetailsProvider } from "../components/contexts/OrderDetailsContext";
import { MemoryRouterOpts, RouteObject } from "react-router-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

function renderWithContextAndRouter(
  routes: RouteObject[],
  routeOpts: MemoryRouterOpts,
  options?: RenderOptions
) {
  const router = createMemoryRouter(routes, routeOpts);
  console.log(routeOpts);

  render(<RouterProvider router={router} />, {
    wrapper: OrderDetailsProvider,
    ...options,
  });
}

export * from "@testing-library/react";

// Override render method.
export { renderWithContextAndRouter as render };
