import { useState } from "react";
import "./Hamburger.css";

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <button
      className={`hamburger ${open ? "active" : ""}`}
      onClick={() => setOpen(!open)}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}