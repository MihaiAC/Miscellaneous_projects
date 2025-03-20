import "./App.css";
import { OrderDetailsProvider } from "./components/contexts/OrderDetailsContext";
import OrderEntry from "./components/pages/order/OrderEntry";
import SummaryForm from "./components/pages/summary/SummaryForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Confirmation from "./components/pages/confirmation/Confirmation";

// TODO: Add routes and test them.
// TODO: Add styling.
const router = createBrowserRouter([
  { path: "/", Component: OrderEntry },
  { path: "/summary", Component: SummaryForm },
  { path: "/confirmation", Component: Confirmation },
]);

function App() {
  return (
    <OrderDetailsProvider>
      <RouterProvider router={router} />
    </OrderDetailsProvider>
  );
}

export default App;
