import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import EventsPage from "./components/EventsPage";
import EventDetailPage from "./components/EventDetailPage";
import NewEventPage from "./components/NewEventPage";
import EditEventPage from "./components/EditEventPage";
import MainNavigation from "./components/MainNavigation";
import EventsNavigation from "./components/EventsNavigation";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/events",
        element: <EventsNavigation />,
        children: [
          { path: "", element: <EventsPage /> },
          { path: ":eventId", element: <EventDetailPage /> },
          { path: "new", element: <NewEventPage /> },
          { path: ":eventId/edit", element: <EditEventPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
