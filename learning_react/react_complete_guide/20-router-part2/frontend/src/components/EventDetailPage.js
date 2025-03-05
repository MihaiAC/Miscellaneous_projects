import classes from "./EventDetailPage.module.css";
import { useParams } from "react-router-dom";

export default function EventDetailPage() {
  const params = useParams();

  return (
    <>
      <h1>EventsDetail Page!</h1>
      <p>Slug is: {params.eventId}</p>
    </>
  );
}
