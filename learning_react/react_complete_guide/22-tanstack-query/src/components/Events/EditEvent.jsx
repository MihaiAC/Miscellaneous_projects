import { Link, redirect, useNavigate, useSubmit } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchEvent, updateEvent, queryClient } from "../../util/http.js";
import { useParams } from "react-router-dom";
import ErrorBlock from "../UI/ErrorBlock.jsx";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";

export default function EditEvent() {
  const navigate = useNavigate();

  const submit = useSubmit();

  const params = useParams();
  const eventId = params.id;

  const { data, isError } = useQuery({
    queryFn: ({ signal }) => fetchEvent({ signal, id: eventId }),
    queryKey: ["events", eventId],
  });

  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (submittedData) => {
  //     const newEvent = submittedData.event;
  //     await queryClient.cancelQueries({ queryKey: ["events", eventId] });

  //     const oldEvent = queryClient.getQueryData(["events", eventId]);
  //     queryClient.setQueryData(["events", eventId], newEvent);

  //     return { oldEvent };
  //   },
  //   // Rolling back optimistic update.
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(["events", eventId], context.oldEvent);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries(["events", eventId]);
  //   },
  // });

  function handleSubmit(formData) {
    submit(formData, { method: "PUT" });
  }

  function handleClose() {
    navigate("../");
  }

  let content;

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

export function loader({ params }) {
  const eventId = params.id;

  return queryClient.fetchQuery({
    queryFn: ({ signal }) => fetchEvent({ signal, id: eventId }),
    queryKey: ["events", eventId],
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });
  queryClient.invalidateQueries(["events"]);
  return redirect("../");
}
