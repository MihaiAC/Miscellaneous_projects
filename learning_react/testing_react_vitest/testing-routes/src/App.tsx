import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routesConfig from "./routes";

export const router = createBrowserRouter(routesConfig);

export default function App() {
  return <RouterProvider router={router} />;
}
