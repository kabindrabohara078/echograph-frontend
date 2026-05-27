import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar(props) {

  return (
    <>
      {/* Overlay Menu */}
      
      <div className={`mobile-menu ${props.open ? "show" : ""}`}>
        <br />
        <Link className="inlink-heading-title" >Product</Link>
          <Link className="inlink-padding">Get Started</Link>
          <Link className="inlink-padding">Features</Link>
          <Link className="inlink-padding">Demo Proview</Link>

        <Link className="inlink-heading-title">Memory Engine</Link>
          <Link className="inlink-padding">Semantic Search</Link>
          <Link className="inlink-padding">Vector Retrieval</Link>
          <Link className="inlink-padding">Adaptive Ranking</Link>
          <Link className="inlink-padding">Memory Lifecycle</Link>
          <Link className="inlink-padding">User Context</Link>
        

        <Link onClick={() => props.setOpen(!props.open)} to="/docs">Docs</Link>
        <Link onClick={() => props.setOpen(!props.open)} to="/contact">Github</Link>

        <Link className="inlink-heading-title">Company</Link>
          <Link onClick={() => props.setOpen(!props.open)} to="/about" className="inlink-padding">About</Link>
          <Link onClick={() => props.setOpen(!props.open)} to="/careers" className="inlink-padding">Careers</Link>

        <Link onClick={() => props.setOpen(!props.open)} to="https://github.com/kabindrabohara078/echograph-frontend" target="_blank">Github</Link>
      </div>
    </>
  );
}