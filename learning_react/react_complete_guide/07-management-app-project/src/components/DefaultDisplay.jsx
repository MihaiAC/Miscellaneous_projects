import PropTypes from "prop-types";
import image from "../assets/no-projects.png";

export default function DefaultDisplay({ onClickAddProject }) {
  return (
    <div>
      <img src={image} alt="Clipboard small icon" />
      <h1>No Project Selected</h1>
      <p>Select a project or get started with a new one</p>
      <button onClick={onClickAddProject}>Create new project</button>
    </div>
  );
}

DefaultDisplay.propTypes = {
  onClickAddProject: PropTypes.func.isRequired,
};
