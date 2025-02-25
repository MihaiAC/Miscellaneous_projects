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
    <div className="w-1/3 bg-black text-white mt-16 p-8 flex flex-col space-y-8 rounded-tr-xl">
      <h1 className="font-bold text-2xl uppercase">Your projects</h1>
      <button
        type="button"
        onClick={onClickAddProject}
        className="bg-stone-700 p-2 rounded-md hover:bg-stone-600 max-w-32"
      >
        + Add Project
      </button>
      {projectArray.length > 0 ? (
        <div className="flex flex-col space-y-4">
          {projectArray.map((project) => (
            <a
              className="hover:bg-stone-700 p-2 block rounded-md w-full"
              onClick={(e) => {
                e.preventDefault();
                onClickProject(project.id);
              }}
              href="#"
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
