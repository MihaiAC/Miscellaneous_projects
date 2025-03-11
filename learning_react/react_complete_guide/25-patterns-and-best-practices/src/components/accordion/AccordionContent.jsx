import { useAccordionContext } from "./Accordion";

export default function AccordionContent({ id, children, className }) {
  const { openItemId } = useAccordionContext();
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
