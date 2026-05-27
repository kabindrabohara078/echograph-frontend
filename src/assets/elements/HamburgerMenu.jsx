import { useState } from "react";
import "./Hamburger.css";

export default function HamburgerMenu(props) {

  return (
    <button
      className={`hamburger ${props.open ? "active" : ""}`}
      onClick={() => props.setOpen(!props.open)}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
}