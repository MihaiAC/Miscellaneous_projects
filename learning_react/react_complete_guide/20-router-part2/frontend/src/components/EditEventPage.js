import classes from "./EditEventPage.module.css";
import { useParams } from "react-router-dom";

export default function EditEventPage() {
  const params = useParams();

  return (
    <>
      <h1>EditEvent Page!</h1>
      <p>{params.eventId}</p>
    </>
  );
}
