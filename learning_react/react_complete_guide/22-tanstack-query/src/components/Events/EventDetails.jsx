import { Link, Outlet } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchEvent, deleteEvent } from "../../util/http.js";
import { queryClient } from "../../util/http.js";

import Header from "../Header.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EventDetails() {
  const params = useParams();
  const eventId = params.id;
  const navigate = useNavigate();

  const {
    data: fetchData,
    isLoading: fetchIsLoading,
    isError: fetchIsError,
    error: fetchError,
  } = useQuery({
    queryKey: ["event-fetch", eventId],
    queryFn: ({ signal }) => fetchEvent({ signal, id: eventId }),
  });

  const {
    mutate,
    isLoading: deleteIsFetching,
    isError: deleteIsError,
    error: deleteError,
  } = useMutation({
    mutationFn: () => deleteEvent({ id: eventId }),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["event-fetch", eventId] });
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate("/events");
    },
  });

  let content = undefined;

  if (fetchIsLoading) {
    content = <LoadingIndicator />;
  }

  if (deleteIsFetching) {
    content = <LoadingIndicator />;
  }

  if (deleteIsError) {
    content = (
      <ErrorBlock
        title="An error occurred..."
        message={deleteError.message && "Error message could not be retrieved."}
      />
    );
  }

  if (fetchIsError) {
    content = (
      <ErrorBlock
        title="An error occurred..."
        message={fetchError.message && "Error message could not be retrieved."}
      />
    );
  }

  if (fetchData) {
    console.log("FETCHED DATA: " + JSON.stringify(fetchData));
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {fetchIsLoading && content}
      {fetchIsError && content}
      <article id="event-details">
        {fetchData && (
          <>
            <header>
              <h1>{fetchData.title}</h1>
              <nav>
                <button onClick={() => mutate()}>Delete</button>
                <Link to="edit">Edit</Link>
              </nav>
            </header>
            <div id="event-details-content">
              <img src={`http://localhost:3000/${fetchData.image}`} alt="" />
              <div id="event-details-info">
                <div>
                  <p id="event-details-location">{fetchData.location}</p>
                  <time dateTime={`Todo-DateT$Todo-Time`}>DATE @ TIME</time>
                </div>
                <p id="event-details-description">{fetchData.description}</p>
              </div>
            </div>
          </>
        )}
      </article>
    </>
  );
}
