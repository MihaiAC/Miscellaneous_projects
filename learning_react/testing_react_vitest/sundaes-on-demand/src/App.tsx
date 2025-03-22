import "./App.css";
import { OrderDetailsProvider } from "./components/contexts/OrderDetailsContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { appRoutes } from "./router/routerConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
