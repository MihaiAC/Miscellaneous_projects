"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import cssClasses from "./nav-link.module.css";

export default function NavLink({ href, children }) {
  const path = usePathname();

  console.log(
    "Computed className:",
    cssClasses.link + (path.startsWith(href) ? ` ${cssClasses.active}` : "")
  );

  return (
    <Link
      href={href}
      className={
        cssClasses.link + (path.startsWith(href) ? " " + cssClasses.active : "")
      }
    >
      {children}
    </Link>
  );
}
