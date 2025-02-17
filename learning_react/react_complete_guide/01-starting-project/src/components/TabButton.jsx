export default function TabButton({ children, isSelected, ...props }) {
  return (
    <li>
      <button {...props} className={isSelected ? "active" : undefined}>
        {" "}
        {children}{" "}
      </button>
    </li>
  );
}
