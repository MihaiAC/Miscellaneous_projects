import classes from "./EventDetailPage.module.css";
import { redirect, useLoaderData, useRouteLoaderData } from "react-router-dom";
import EventItem from "./EventItem";

export default function EventDetailPage() {
  const data = useRouteLoaderData("event-detail");

  return (
    <>
      <EventItem event={data.event} />
    </>
  );
}

export async function loader({ request, params }) {
  const eventId = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + eventId);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Could not details for selected event." }),
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}

export async function deleteAction({ params, request }) {
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Response(
      JSON.stringify({
        message: errorData.message || "Could not delete event.",
      }),
      {
        status: response.status,
      }
    );
  }

  return redirect("/events");
}
