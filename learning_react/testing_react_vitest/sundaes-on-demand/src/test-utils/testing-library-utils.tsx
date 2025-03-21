import { render, RenderOptions } from "@testing-library/react";
import { OrderDetailsProvider } from "../components/contexts/OrderDetailsContext";
import { MemoryRouterOpts, RouteObject } from "react-router-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function renderWithContextAndRouter(
  routes: RouteObject[],
  routeOpts: MemoryRouterOpts,
  options?: RenderOptions
) {
  // Create the router.
  const router = createMemoryRouter(routes, routeOpts);

  // Create the query provider.
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
    {
      wrapper: OrderDetailsProvider,
      ...options,
    }
  );
}

export * from "@testing-library/react";

// Override render method.
export { renderWithContextAndRouter as render };
