import Sidebar from "./components/Sidebar";
import { useRef, useState } from "react";
import Project from "./util/Project";

const proj_1 = new Project("Project 1", "A dummy project", "25/02/2025");
const proj_2 = new Project("Project 2", "A second dummy project", "25/02/2025");

function App() {
  const [projects, setProjects] = useState({
    [proj_1.id]: proj_1,
    [proj_2.id]: proj_2,
  });

  const [displayMode, setDisplayMode] = useState("default");

  function handleSidebarAddProject() {}

  function handleSidebarProjectClick(projectId) {}

  return (
    <div id="container">
      <Sidebar
        projects={projects}
        onClickAddProject={handleSidebarAddProject}
        onClickProject={handleSidebarProjectClick}
      />

      <div id="display">
        <h1 className="my-8 text-center text-5xl font-bold">Hello World</h1>
      </div>
    </div>
  );
}

export default App;
