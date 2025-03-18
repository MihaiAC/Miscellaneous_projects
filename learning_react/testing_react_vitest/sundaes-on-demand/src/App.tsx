import "./App.css";
import OrderEntry from "./components/OrderEntry";
import SummaryForm from "./components/SummaryForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <OrderEntry /> },
  { path: "/summary", Component: SummaryForm },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
