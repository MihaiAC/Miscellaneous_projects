import "./App.css";
import { OrderDetailsProvider } from "./components/contexts/OrderDetailsContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { appRoutes } from "./router/routerConfig";

// TODO: Add routes and test them.
// TODO: Add styling.
const router = createBrowserRouter(appRoutes);

function App() {
  return (
    <OrderDetailsProvider>
      <RouterProvider router={router} />
    </OrderDetailsProvider>
  );
}

export default App;
