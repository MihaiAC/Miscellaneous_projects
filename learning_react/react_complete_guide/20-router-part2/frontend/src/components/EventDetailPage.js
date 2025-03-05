import classes from "./EventDetailPage.module.css";
import { useParams, useLoaderData } from "react-router-dom";
import EventItem from "./EventItem";

export default function EventDetailPage() {
  const data = useLoaderData();

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
