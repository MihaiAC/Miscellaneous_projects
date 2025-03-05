import classes from "./EventsNavigation.module.css";
import { Outlet } from "react-router-dom";

function EventsNavigation() {
  return (
    <>
      <header className={classes.header}>
        <nav>
          <ul className={classes.list}>
            <li>
              <a href="/events">All Events</a>
            </li>
            <li>
              <a href="/events/new">New Event</a>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}

export default EventsNavigation;
