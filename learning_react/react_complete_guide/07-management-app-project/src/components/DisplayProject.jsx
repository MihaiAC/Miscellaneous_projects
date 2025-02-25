import PropTypes from "prop-types";
import Project from "../util/Project";
import { useState } from "react";
import Task from "../util/Task";

export default function DisplayProject({ project, onDelete, onAddTask }) {
  const [taskName, setTaskName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!taskName.trim()) {
      return;
    }

    const newTask = new Task(taskName);
    onAddTask(project.id, newTask);
    setTaskName("");
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.date}</p>
      <p>{project.description}</p>
      <button onClick={() => onDelete(project.id)}>Delete</button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {project.tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}

DisplayProject.propTypes = {
  project: Project,
  onDelete: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
};
