import { ReactNode, useEffect, useState } from "react";

interface PopoverProps {
  children: ReactNode;
  targetRef: React.RefObject<HTMLFormElement | null>;
}

export default function Popover({ children, targetRef }: PopoverProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const targetElement = targetRef.current;

    if (!targetElement) {
      return;
    }

    const handleMouseEnter = () => setOpen(true);
    const handleMouseLeave = () => setOpen(false);

    targetElement.addEventListener("mouseenter", handleMouseEnter);
    targetElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      targetElement.removeEventListener("mouseenter", handleMouseEnter);
      targetElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [targetRef]);

  return (
    <div className="relative">
      {open && (
        <div className="absolute left-1/2 top-full mt-2 translate-x-1/2 -translate-y-1/2 w-48 bg-white border shadow-lg rounded-md p-3">
          {children}
        </div>
      )}
    </div>
  );
}
