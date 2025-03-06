import { Await, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "./EventItem";
import EventsList from "./EventsList";
import { Suspense } from "react";

export default function EventDetailPage() {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        {" "}
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>

      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

async function loadEvent(eventId) {
  // Fetch returns a Promise of a Response.
  const response = await fetch("http://localhost:8080/events/" + eventId);
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch event." }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  // Fetch returns a Promise of a Response.
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({ request, params }) {
  const eventId = params.eventId;

  return {
    event: loadEvent(eventId),
    events: loadEvents(),
  };
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
