import PropTypes from "prop-types";

const inputStyle =
  "bg-stone-300 focus:outline-none p-4 text-md border-b-4 border-stone-400 focus:border-black";

export default function StyledInput({ id, label, type, ref, ...props }) {
  return (
    <>
      <label htmlFor={id} className="text-stone-700 uppercase font-semibold">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea ref={ref} id={id} {...props} className={inputStyle} />
      ) : (
        <input
          ref={ref}
          id={id}
          type={type}
          {...props}
          className={inputStyle}
        />
      )}
    </>
  );
}

StyledInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(HTMLInputElement) }),
  ]),
};
