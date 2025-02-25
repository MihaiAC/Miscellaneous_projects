// Sidebar will have no state.
// Receives the Projects it has to display as props.
// Calls handler on Add Project button press.
// Calls handler on Project button press.

import PropTypes from "prop-types";

export default function Sidebar({
  projects,
  onClickAddProject,
  onClickProject,
}) {
  const projectArray = Object.values(projects);

  return (
    <div>
      <h3>Your projects</h3>
      <button onClick={onClickAddProject}>Add Project</button>
      {projectArray.length > 0 ? (
        <div>
          {projectArray.map((project) => (
            <a
              onClick={() => onClickProject(project.id)}
              href=""
              key={project.id}
            >
              {project.name}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

Sidebar.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
  onClickAddProject: PropTypes.func.isRequired,
  onClickProject: PropTypes.func.isRequired,
};
