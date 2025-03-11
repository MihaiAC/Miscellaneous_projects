import { useAccordionContext } from "./Accordion";

export default function AccordionItem({ className, children }) {
  return <li className={className}>{children}</li>;
}
