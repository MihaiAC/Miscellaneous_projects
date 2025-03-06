import classes from "./NewEventPage.module.css";
import EventForm from "./EventForm";
import { redirect } from "react-router-dom";

export default function NewEventPage() {
  return <EventForm />;
}

export async function action({ request, params }) {
  const formData = await request.formData();

  const eventData = {
    title: formData.get("title"),
    image: formData.get("image"),
    description: formData.get("description"),
    date: formData.get("date"),
  };

  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eventData),
  });

  // Handle validation errors.
  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Response(
      JSON.stringify({ message: errorData.message || "Could not save event." }),
      {
        status: response.status,
      }
    );
  }

  return redirect("/events");
}
