import { useState } from "react";
import "./Hamburger.css";

export default function HamburgerMenu(props) {

  return (
    <button
      className={`hamburger ${props.open ? "active" : ""}`}
      onClick={() => props.setOpen(!props.open)}
    >
      <span className={`${props.dark? "bg-white":"bg-black"}`}></span>
      <span className={`${props.dark? "bg-white":"bg-black"}`}></span>
      <span className={`${props.dark? "bg-white":"bg-black"}`}></span>
    </button>
  );
}