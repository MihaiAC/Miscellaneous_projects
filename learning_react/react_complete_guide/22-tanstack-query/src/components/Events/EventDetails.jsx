import { Link, Outlet } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchEvent, deleteEvent } from "../../util/http.js";
import { queryClient } from "../../util/http.js";

import Header from "../Header.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { useState } from "react";
import Modal from "../UI/Modal.jsx";

export default function EventDetails() {
  const params = useParams();
  const eventId = params.id;

  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: fetchData,
    isLoading: fetchIsLoading,
    isError: fetchIsError,
    error: fetchError,
  } = useQuery({
    queryKey: ["events", eventId],
    queryFn: ({ signal }) => fetchEvent({ signal, id: eventId }),
  });

  const {
    mutate,
    isPending: deleteIsPending,
    isError: deleteIsError,
    error: deleteError,
  } = useMutation({
    mutationFn: () => deleteEvent({ id: eventId }),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["events", eventId] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate("/events");
    },
  });

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  function handleDelete() {
    mutate();
  }

  let content = undefined;

  if (fetchIsLoading) {
    content = (
      <div id="event-details-content" className="center">
        Fetching event data...
      </div>
    );
  }

  if (fetchIsError) {
    content = (
      <div id="event-details-content" className="center">
        <ErrorBlock
          title="An error occurred..."
          message={
            fetchError.message && "Error message could not be retrieved."
          }
        />
      </div>
    );
  }

  if (fetchData) {
    const formattedDate = new Date(fetchData.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    content = (
      <>
        {isDeleting && (
          <Modal onClose={handleStopDelete}>
            <h2>Are you sure?</h2>
            <p>
              Do you really want to delete this event? This action cannot be
              undone
            </p>
            <div className="form-actions">
              {deleteIsPending && <p>Deleting, please wait...</p>}
              {!deleteIsPending && (
                <>
                  {" "}
                  <button onClick={handleStopDelete} className="button-text">
                    Cancel
                  </button>
                  <button onClick={handleDelete} className="button">
                    Delete
                  </button>
                </>
              )}
            </div>
            {deleteIsError && (
              <ErrorBlock
                title="Failed to delete event"
                message={deleteError.info?.message || "Error message missing"}
              />
            )}
          </Modal>
        )}
        <header>
          <h1>{fetchData.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${fetchData.image}`} alt="" />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{fetchData.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {fetchData.time}
              </time>
            </div>
            <p id="event-details-description">{fetchData.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
