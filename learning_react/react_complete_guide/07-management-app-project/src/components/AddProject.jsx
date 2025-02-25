import { useState } from "react";
import StyledInput from "./StyledInput";
import PropTypes from "prop-types";

export default function AddProject({ onProjectAdd, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit() {
    // event.preventDefault();

    if (!title.trim()) {
      alert("Title cannot be empty!");
      return;
    }

    onProjectAdd({ title, description, date });

    setTitle("");
    setDescription("");
    setDate("");
  }

  function handleCancel() {
    // Not sure if this is necessary.
    setTitle("");
    setDescription("");
    setDate("");

    onCancel();
  }

  return (
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <StyledInput
          id="add-project-form-descr"
          label="Description"
          type="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <StyledInput
          id="add-project-form-date"
          label="Due date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
    </div>
  );
}

AddProject.propTypes = {
  onProjectAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
