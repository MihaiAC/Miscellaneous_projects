import Sidebar from "./components/Sidebar";
import DefaultDisplay from "./components/DefaultDisplay";
import AddProject from "./components/AddProject";
import { useRef, useState } from "react";
import Project from "./util/Project";
import DisplayProject from "./components/DisplayProject";

const proj_1 = new Project("Project 1", "A dummy project", "25/02/2025");
const proj_2 = new Project("Project 2", "A second dummy project", "25/02/2025");

const DisplayMode = {
  DEFAULT: "default",
  ADD: "add",
  DISPLAY: "display",
};

function App() {
  const [projects, setProjects] = useState({
    [proj_1.id]: proj_1,
    [proj_2.id]: proj_2,
  });

  // States: default, add, display.
  const [displayMode, setDisplayMode] = useState(DisplayMode.DEFAULT);

  // Ref: ID of a project to display.
  const displayProjectId = useRef(undefined);

  function handleClickAddProject() {
    setDisplayMode(DisplayMode.ADD);
  }

  function handleDisplayProject(projectId) {
    displayProjectId.current = projectId;
    setDisplayMode(DisplayMode.DISPLAY);
  }

  function handleCancelAddProject() {
    setDisplayMode(DisplayMode.DEFAULT);
  }

  function handleAddProject({ title, description, date }) {
    const newProject = new Project(title, description, date);
    setProjects((prevProjects) => ({
      ...prevProjects,
      [newProject.id]: newProject,
    }));
    setDisplayMode(DisplayMode.DEFAULT);
  }

  function handleDeleteProject(projectId) {
    setProjects((prevProjects) => {
      const { [projectId]: _, ...restOfProjects } = prevProjects;
      return restOfProjects;
    });
    setDisplayMode(DisplayMode.DEFAULT);
  }

  function handleAddTask(projectId, newTask) {
    setProjects((prevProjects) => {
      const project = prevProjects[projectId];
      project.addTask(newTask);
      return {
        ...prevProjects,
        [projectId]: project,
      };
    });
  }

  function handleDeleteTask(projectId, task) {
    setProjects((prevProjects) => {
      const project = prevProjects[projectId];
      project.removeTask(task.id);
      return {
        ...prevProjects,
        [projectId]: project,
      };
    });
  }

  return (
    <div id="container">
      <Sidebar
        projects={projects}
        onClickAddProject={handleClickAddProject}
        onClickProject={handleDisplayProject}
      />

      <div id="display">
        {displayMode === DisplayMode.DEFAULT ? (
          <DefaultDisplay onClickAddProject={handleClickAddProject} />
        ) : null}
        {displayMode === DisplayMode.ADD ? (
          <AddProject
            onSubmit={handleAddProject}
            onCancel={handleCancelAddProject}
          />
        ) : undefined}
        {displayMode === DisplayMode.DISPLAY ? (
          <DisplayProject
            project={projects[displayProjectId.current]}
            onDelete={handleDeleteProject}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
          />
        ) : undefined}
      </div>
    </div>
  );
}

export default App;
