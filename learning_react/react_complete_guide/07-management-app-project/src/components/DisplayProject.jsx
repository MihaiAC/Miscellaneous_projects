import PropTypes from "prop-types";
import Project from "../util/Project";
import { useState } from "react";
import Task from "../util/Task";

export default function DisplayProject({
  project,
  onDelete,
  onAddTask,
  onDeleteTask,
}) {
  const [taskName, setTaskName] = useState("");

  function handleSubmit() {
    if (!taskName.trim()) {
      return;
    }

    const newTask = new Task(taskName);
    onAddTask(project.id, newTask);
    setTaskName("");
  }

  return (
    <div className="mt-32 px-8 flex flex-col space-y-4 w-full max-w-lg">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-stone-700">{project.name}</h1>
        <button type="button" onClick={() => onDelete(project.id)}>
          Delete
        </button>
      </div>

      <p className="text-lg text-stone-500">{project.date}</p>
      <p>{project.description}</p>

      <hr className="w-full border-t border-gray-300" />

      <h1 className="text-3xl font-bold text-stone-700">Tasks</h1>
      <div className="flex space-x-8">
        {" "}
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="bg-stone-400 rounded-md p-2"
        />
        <button type="button" onClick={handleSubmit}>
          Add Task
        </button>
      </div>

      <ul>
        {Array.from(project.tasks).map(([taskId, task]) => (
          <li key={taskId} className="flex justify-between bg-stone-300 p-4">
            <p>{task.name}</p>{" "}
            <button
              type="button"
              onClick={() => onDeleteTask(project.id, task)}
            >
              Clear
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

DisplayProject.propTypes = {
  project: Project,
  onDelete: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};
