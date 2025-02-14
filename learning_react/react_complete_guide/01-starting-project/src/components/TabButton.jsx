export default function TabButton({ children, onSelect, isSelected }) {
  return (
    <li>
      <button onClick={onSelect} className={isSelected ? "active" : undefined}>
        {" "}
        {children}{" "}
      </button>
    </li>
  );
}
