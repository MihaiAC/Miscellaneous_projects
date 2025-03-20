import OrderEntry from "../components/pages/order/OrderEntry";
import OrderSummary from "../components/pages/summary/OrderSummary";
import OrderConfirmation from "../components/pages/confirmation/OrderConfirmation";

export const appRoutes = [
  { path: "/", Component: OrderEntry },
  { path: "/summary", Component: OrderSummary },
  { path: "/confirmation", Component: OrderConfirmation },
];
