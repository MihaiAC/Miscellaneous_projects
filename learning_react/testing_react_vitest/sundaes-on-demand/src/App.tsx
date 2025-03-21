import "./App.css";
import { OrderDetailsProvider } from "./components/contexts/OrderDetailsContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { appRoutes } from "./router/routerConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// TODO: Use React query + axios to retrieve + cache objects.
// TODO: Add styling.
// TODO: Confirmation and OrderSummary unit tests(?).
// TODO: Centralise all string constants?
const router = createBrowserRouter(appRoutes);
const queryClient = new QueryClient();

function App() {
  return (
    <OrderDetailsProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </OrderDetailsProvider>
  );
}

export default App;
