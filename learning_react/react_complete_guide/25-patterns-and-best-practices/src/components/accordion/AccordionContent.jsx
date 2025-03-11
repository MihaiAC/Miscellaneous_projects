import { useAccordionContext } from "./Accordion";
import { useAccordionItemContext } from "./AccordionItem";

export default function AccordionContent({ children, className }) {
  const { openItemId } = useAccordionContext();
  const id = useAccordionItemContext();
  const isOpen = openItemId === id;

  let calculatedClassName = "";
  if (isOpen) {
    calculatedClassName += "open ";
  } else {
    calculatedClassName += "close ";
  }

  if (className) {
    calculatedClassName += className;
  }

  console.log(id + " " + calculatedClassName);

  return <div className={calculatedClassName}>{children}</div>;
}
