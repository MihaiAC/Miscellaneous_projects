import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function Button({
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  let fullClsName = "btn btn-primary ";

  if (disabled) {
    fullClsName += "btn-disabled ";
  }

  if (className) {
    fullClsName += className;
  }

  return (
    <button className={fullClsName} {...props} disabled={disabled}>
      {children}
    </button>
  );
}
