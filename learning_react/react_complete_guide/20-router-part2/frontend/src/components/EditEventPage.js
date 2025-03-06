import { useRouteLoaderData } from "react-router-dom";
import EventForm from "./EventForm";

export default function EditEventPage() {
  const data = useRouteLoaderData("event-detail");
  // const event = data.event;

  return <EventForm event={data.event} method="patch"></EventForm>;
}
