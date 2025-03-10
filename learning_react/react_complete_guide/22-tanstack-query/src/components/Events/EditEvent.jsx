import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEvent, updateEvent, queryClient } from "../../util/http.js";
import { useParams } from "react-router-dom";
import ErrorBlock from "../UI/ErrorBlock.jsx";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";

export default function EditEvent() {
  const navigate = useNavigate();

  const params = useParams();
  const eventId = params.id;

  const { data, isPending, isError } = useQuery({
    queryFn: ({ signal }) => fetchEvent({ signal, id: eventId }),
    queryKey: ["events", eventId],
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (submittedData) => {
      const newEvent = submittedData.event;
      await queryClient.cancelQueries({ queryKey: ["events", eventId] });

      const oldEvent = queryClient.getQueryData(["events", eventId]);
      queryClient.setQueryData(["events", eventId], newEvent);

      return { oldEvent };
    },
    // Rolling back optimistic update.
    onError: (error, data, context) => {
      queryClient.setQueryData(["events", eventId], context.oldEvent);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events", eventId]);
    },
  });

  function handleSubmit(formData) {
    mutate({ id: eventId, event: formData });
    navigate("../");
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  if (isPending) {
    content = (
      <div className="center">
        <LoadingIndicator />
      </div>
    );
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock title="Failed to load event" message="Boilerplate msg." />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
