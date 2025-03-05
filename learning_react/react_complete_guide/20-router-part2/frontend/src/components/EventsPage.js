import classes from "./EventsPage.module.css";
import { Link } from "react-router-dom";

const EVENTS = [
  { id: "p1", title: "Event 1" },
  { id: "p2", title: "Event 2" },
  { id: "p3", title: "Event 3" },
];

export default function EventsPage() {
  return (
    <>
      <h1>Events page</h1>
      <ul>
        {EVENTS.map((event) => (
          <li key={event.id}>
            <Link to={`${event.id}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
