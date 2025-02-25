import { useState } from "react";
import PropTypes from "prop-types";

export default function AddProject({ onSubmit, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      alert("Title cannot be empty!");
      return;
    }

    onSubmit({ title, description, date });

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="add-project-form-title">Title:</label>
        <input
          id="add-project-form-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="add-project-form-descr">Description:</label>
        <textarea id="add-project-form-descr" value={description}>
          {" "}
          onChange={(e) => setDescription(e.target.value)}
        </textarea>
      </div>
      <div>
        <label htmlFor="add-project-form-date">Due date:</label>
        <input
          id="add-project-form-date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
      <button onClick={handleCancel}>Cancel</button>
    </form>
  );
}

AddProject.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
