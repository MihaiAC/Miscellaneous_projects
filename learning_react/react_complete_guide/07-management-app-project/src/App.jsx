import Sidebar from "./components/Sidebar";
import DefaultDisplay from "./components/DefaultDisplay";
import AddProject from "./components/AddProject";
import { useRef, useState } from "react";
import Project from "./util/Project";
import DisplayProject from "./components/DisplayProject";

const proj_1 = new Project("Project 1", "A dummy project", "25/02/2025");
const proj_2 = new Project("Project 2", "A second dummy project", "25/02/2025");

function App() {
  const [projects, setProjects] = useState({
    [proj_1.id]: proj_1,
    [proj_2.id]: proj_2,
  });

  // States: default, add, display.
  const [displayMode, setDisplayMode] = useState("default");

  // Ref: ID of a project to display.
  const displayProjectId = useRef(undefined);

  function handleClickAddProject() {}

  function handleDisplayProject(projectId) {}

  function handleCancelAddProject() {}

  function handleAddProject({ title, description, date }) {}

  function handleDeleteProject(projectId) {}

  function handleAddTask(projectId, newTask) {}

  return (
    <div id="container">
      <Sidebar
        projects={projects}
        onClickAddProject={handleClickAddProject}
        onClickProject={handleDisplayProject}
      />

      <div id="display">
        {displayMode === "default" ? (
          <DefaultDisplay onClickAddProject={handleClickAddProject} />
        ) : null}
        {displayMode === "add" ? (
          <AddProject
            onSubmit={handleAddProject}
            onCancel={handleCancelAddProject}
          />
        ) : undefined}
        {displayMode === "display" ? (
          <DisplayProject
            project={projects[displayProjectId]}
            onDelete={handleDeleteProject}
            onAddTask={handleAddTask}
          />
        ) : undefined}
      </div>
    </div>
  );
}

export default App;
