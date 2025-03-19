import "./App.css";
import { OrderDetailsProvider } from "./components/contexts/OrderDetailsContext";
import OrderEntry from "./components/pages/order/OrderEntry";
import SummaryForm from "./components/pages/summary/SummaryForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/ui/Header";

// TODO: test routes after finishing the course.
const router = createBrowserRouter([
  { path: "/", element: <Header>Welcome to Sundaes on demand!</Header> },
  {
    path: "/options",
    element: (
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    ),
  },
  { path: "/summary", Component: SummaryForm },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
