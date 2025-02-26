import { useRef } from "react";
import StyledInput from "./StyledInput";
import Modal from "./Modal";
import PropTypes from "prop-types";

export default function AddProject({ onProjectAdd, onCancel }) {
  const modal = useRef();

  const title = useRef();
  const description = useRef();
  const date = useRef();

  function flushInputs() {
    if (title.current !== undefined) {
      title.current.value = "";
    }

    if (description.current !== undefined) {
      description.current.value = "";
    }

    if (date.current !== undefined) {
      date.current.value = "";
    }
  }

  flushInputs();

  function handleSubmit() {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDate = date.current.value;

    // Validation.
    if (
      enteredTitle.trim() === "" ||
      enteredDescription === "" ||
      enteredDate.trim() === ""
    ) {
      // Show error modal.
      modal.current.open();
      return;
    }

    onProjectAdd({
      title: enteredTitle,
      description: enteredDescription,
      date: enteredDate,
    });
  }

  function handleCancel() {
    onCancel();
  }

  return (
    <>
      <Modal ref={modal}>
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid input</h2>
        <p className="text-stone-600 mb-4">
          Please make sure that no input fields are empty.
        </p>
      </Modal>
      <div className="mt-36 w-full">
        <div className="flex flex-col max-w-lg space-y-4 mt-16 mx-auto">
          <div className="flex justify-between mb-16">
            <h1 className="text-4xl font-bold">Add project</h1>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleSubmit}
                className="hover:bg-black hover:text-white rounded-md p-2 border-black border-2"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="hover:bg-black hover:text-white rounded-md p-2 border-black border-2"
              >
                Cancel
              </button>
            </div>
          </div>

          <StyledInput
            id="add-project-form-title"
            label="Title"
            type="text"
            //value={title.current}
            ref={title}
          />

          <StyledInput
            id="add-project-form-descr"
            label="Description"
            type="textarea"
            //value={description}
            ref={description}
          />

          <StyledInput
            id="add-project-form-date"
            label="Due date"
            type="date"
            //value={date}
            ref={date}
            //onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

AddProject.propTypes = {
  onProjectAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
