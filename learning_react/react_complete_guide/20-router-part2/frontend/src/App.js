import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage";
import EventsPage, { loader as eventsLoader } from "./components/EventsPage";
import EventDetailPage, {
  loader as eventDetailLoader,
  deleteAction as deleteEvent,
} from "./components/EventDetailPage";
import NewEventPage from "./components/NewEventPage";
import EditEventPage from "./components/EditEventPage";
import RootLayout from "./components/Root";
import EventsRootLayout from "./components/EventsRoot";
import ErrorPage from "./components/Error";
import { action as eventAction } from "./components/EventForm";
import NewsletterPage, {
  action as newsletterAction,
} from "./components/Newsletter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            path: "",
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEvent,
              },
              { path: "edit", element: <EditEventPage />, action: eventAction },
            ],
          },

          { path: "new", element: <NewEventPage />, action: eventAction },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
