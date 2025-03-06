import classes from "./NewEventPage.module.css";
import EventForm from "./EventForm";
import { redirect } from "react-router-dom";

export default function NewEventPage() {
  return <EventForm method="post" />;
}
