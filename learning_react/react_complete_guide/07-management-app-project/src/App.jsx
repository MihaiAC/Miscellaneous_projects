import Sidebar from "./components/Sidebar";
import DefaultDisplay from "./components/DefaultDisplay";
import AddProject from "./components/AddProject";
import { useState } from "react";
import Project from "./util/Project";
import DisplayProject from "./components/DisplayProject";

const DisplayMode = {
  DEFAULT: "default",
  ADD: "add",
  DISPLAY: "display",
};

function App() {
  const [projects, setProjects] = useState({});

  // States: default, add, display.
  const [displayMode, setDisplayMode] = useState(DisplayMode.DEFAULT);

  // Ref: ID of a project to display.
  const [displayProjectId, setDisplayProjectId] = useState(undefined);
  // const displayProjectId = useRef(undefined);

  function handleClickAddProject() {
    setDisplayMode(DisplayMode.ADD);
  }

  function handleDisplayProject(projectId) {
    setDisplayProjectId(projectId);
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
      // eslint-disable-next-line no-unused-vars
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
    <div id="container" className="flex h-screen">
      <Sidebar
        projects={projects}
        onClickAddProject={handleClickAddProject}
        onClickProject={handleDisplayProject}
      />

      {displayMode === DisplayMode.DEFAULT ? (
        <DefaultDisplay onClickAddProject={handleClickAddProject} />
      ) : null}
      {displayMode === DisplayMode.ADD ? (
        <AddProject
          onProjectAdd={handleAddProject}
          onCancel={handleCancelAddProject}
        />
      ) : undefined}
      {displayMode === DisplayMode.DISPLAY ? (
        <DisplayProject
          project={projects[displayProjectId]}
          onDelete={handleDeleteProject}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
        />
      ) : undefined}
    </div>
  );
}

export default App;
