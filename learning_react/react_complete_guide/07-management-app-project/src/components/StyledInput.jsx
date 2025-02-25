import PropTypes from "prop-types";

const inputStyle =
  "bg-stone-300 focus:outline-none p-4 text-md border-b-4 border-stone-400 focus:border-black";

export default function StyledInput({ id, label, type, ...props }) {
  return (
    <>
      <label htmlFor={id} className="text-stone-700 uppercase font-semibold">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea id={id} {...props} className={inputStyle} />
      ) : (
        <input id={id} type={type} {...props} className={inputStyle} />
      )}
    </>
  );
}

StyledInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
};
