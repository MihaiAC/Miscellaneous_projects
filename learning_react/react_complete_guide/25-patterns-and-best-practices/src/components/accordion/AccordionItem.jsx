import { useAccordionContext } from "./Accordion";

export default function AccordionItem({ id, title, children, className }) {
  const { openItemId, toggleItem } = useAccordionContext();

  const isOpen = openItemId === id;

  function handleClick() {
    toggleItem(id);
  }

  return (
    <li className={className}>
      <h3 onClick={handleClick}>{title}</h3>
      <div className={`accordion-item-content ${isOpen ? "open" : ""}`}>
        {children}
      </div>
    </li>
  );
}
