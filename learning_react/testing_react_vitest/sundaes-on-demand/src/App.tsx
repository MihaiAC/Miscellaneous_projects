import "./App.css";
import Options from "./components/Options";
import SummaryForm from "./components/SummaryForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Options optionType="toppings" /> },
  { path: "/summary", Component: SummaryForm },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
