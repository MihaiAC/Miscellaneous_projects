import PropTypes from "prop-types";
import image from "../assets/no-projects.png";

export default function DefaultDisplay({ onClickAddProject }) {
  return (
    <div className="mt-32 p-16 flex flex-col items-center justify-start w-full h-full space-y-8">
      <img src={image} alt="Clipboard small icon" className="w-16 h-16" />
      <h1 className="text-2xl font-extrabold text-stone-600">
        No Project Selected
      </h1>
      <p className="text-lg text-stone-400">
        Select a project or get started with a new one
      </p>
      <button
        type="button"
        onClick={onClickAddProject}
        className="bg-stone-700 hover:bg-stone-600 rounded-md p-2 text-stone-400 text-lg"
      >
        Create new project
      </button>
    </div>
  );
}

DefaultDisplay.propTypes = {
  onClickAddProject: PropTypes.func.isRequired,
};
