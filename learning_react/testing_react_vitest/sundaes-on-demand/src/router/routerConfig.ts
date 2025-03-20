import OrderEntry from "../components/pages/order/OrderEntry";
import SummaryForm from "../components/pages/summary/SummaryForm";
import Confirmation from "../components/pages/confirmation/Confirmation";

export const appRoutes = [
  { path: "/", Component: OrderEntry },
  { path: "/summary", Component: SummaryForm },
  { path: "/confirmation", Component: Confirmation },
];
