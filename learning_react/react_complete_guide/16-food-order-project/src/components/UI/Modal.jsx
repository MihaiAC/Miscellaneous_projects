import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className = "" }) {
  const dialogRef = useRef();

  useEffect(() => {
    if (open) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialogRef} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
