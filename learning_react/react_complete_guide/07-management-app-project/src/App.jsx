import Sidebar from "./components/Sidebar";
import DefaultDisplay from "./components/DefaultDisplay";
import AddProject from "./components/AddProject";
import { useRef, useState } from "react";
import Project from "./util/Project";

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

  function onCancelAddProject() {}

  function onAddProject({ title, description, date }) {}

  function onDeleteProject(projectId) {}

  function onAddTask(projectId, newTask) {}

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
          <AddProject onSubmit={onAddProject} onCancel={onCancelAddProject} />
        ) : undefined}
        {displayMode === "display" ? undefined : undefined}
      </div>
    </div>
  );
}

export default App;
