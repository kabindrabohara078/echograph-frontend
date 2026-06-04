import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MainMenu.css";

export default function MainMenu(props) {

  useEffect(() => {
  if (props.open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [props.open]);

  return (
    <>

     <div className={`mobile-menu ${props.open ? "show" : ""}`}>
        
        <Link className="cursor-pointer" to='/products' onClick={() => props.setOpen(!props.open)}>Product</Link>
          <Link to='/start' onClick={() => props.setOpen(!props.open)} className="inlink-padding">Get Started</Link>
          <Link to='/features' onClick={() => props.setOpen(!props.open)} className="inlink-padding">Features</Link>
          <Link to='/demo' onClick={() => props.setOpen(!props.open)} className="inlink-padding">Demo Proview</Link>

        <Link className="cursor-pointer">Memory Engine</Link>
          <Link to='/memory/#search' onClick={() => props.setOpen(!props.open)} className="inlink-padding">Semantic Search</Link>
          <Link to='/memory/#vector' onClick={() => props.setOpen(!props.open)} className="inlink-padding">Vector Retrieval</Link>
          <Link to='/memory/#ranking' onClick={() => props.setOpen(!props.open)} className="inlink-padding">Adaptive Ranking</Link>
          <Link to='/memory/#lifecycle' onClick={() => props.setOpen(!props.open)} className="inlink-padding">Memory Lifecycle</Link>
          <Link to='/memory/#context' onClick={() => props.setOpen(!props.open)} className="inlink-padding">User Context</Link>
        

        <Link to="/docs" onClick={() => props.setOpen(!props.open)} className="cursor-pointer">Docs</Link>
        <Link to="https://github.com/kabindrabohara078/echograph-frontend" target="_blank">Github</Link>
        

        <Link className="cursor-pointer">Company</Link>
          <Link onClick={() => props.setOpen(!props.open)} to="/about" className="inlink-padding">About</Link>
          <Link onClick={() => props.setOpen(!props.open)} to="/careers" className="inlink-padding">Careers</Link>

        <Link className="cursor-pointer" onClick={() => props.setOpen(!props.open)} to="/test" >Test</Link>

      </div>
    </>
  );
}