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

     <div className={`mobile-menu ${props.open ? "show" : ""} top-20`}
     style={{
                    backgroundColor: props.dark? '#222':'white',
                    color:props.dark? 'white':'black'

     }}
     >
        
        <Link
        style={{
          color:props.dark? 'white':'black'
        }}
        className="cursor-pointer" to='/products' onClick={() => props.setOpen(!props.open)}>Product</Link>
          <Link
          style={{
          color:props.dark? 'white':'black'
        }}
          to='/start' onClick={() => props.setOpen(!props.open)} className="inlink-padding">Get Started</Link>
          <Link
          style={{
          color:props.dark? 'white':'black'
        }}
          to='/products' onClick={() => props.setOpen(!props.open)} className="inlink-padding">Products</Link>
        <Link to='/memory' onClick={() => props.setOpen(!props.open)}
        style={{
          color:props.dark? 'white':'black'
        }}
        className="cursor-pointer">Memory Engine</Link>
                  <Link to='/memory' onClick={() => props.setOpen(!props.open)}

          style={{
          color:props.dark? 'white':'black'
        }}
          to='/memory/#search' onClick={() => props.setOpen(!props.open)} className="inlink-padding">Semantic Search</Link>
                  <Link to='/memory' onClick={() => props.setOpen(!props.open)}

          style={{
          color:props.dark? 'white':'black'
        }}
          to='/memory/#vector' onClick={() => props.setOpen(!props.open)} className="inlink-padding">Vector Retrieval</Link>
                  <Link to='/memory' onClick={() => props.setOpen(!props.open)}

          style={{
          color:props.dark? 'white':'black'
        }}
          to='/memory/#ranking' onClick={() => props.setOpen(!props.open)} className="inlink-padding">Adaptive Ranking</Link>
                 <Link to='/memory' onClick={() => props.setOpen(!props.open)}

          style={{
          color:props.dark? 'white':'black'
        }}
          to='/memory/#lifecycle' onClick={() => props.setOpen(!props.open)} className="inlink-padding">Memory Lifecycle</Link>
                 <Link to='/memory' onClick={() => props.setOpen(!props.open)}

          style={{
          color:props.dark? 'white':'black'
        }}
          to='/memory/#context' onClick={() => props.setOpen(!props.open)} className="inlink-padding">User Context</Link>
        

                <Link to='/docs' onClick={() => props.setOpen(!props.open)}

        style={{
          color:props.dark? 'white':'black'
        }}
        to="/docs" onClick={() => props.setOpen(!props.open)} className="cursor-pointer">Docs</Link>
        <Link 
        style={{
          color:props.dark? 'white':'black'
        }}
        to="https://github.com/kabindrabohara078/echograph-frontend" target="_blank">Github</Link>
        

        <Link 
        style={{
          color:props.dark? 'white':'black'
        }}
        className="cursor-pointer">Company</Link>
                  <Link to='/about' onClick={() => props.setOpen(!props.open)}

          style={{
          color:props.dark? 'white':'black'
        }}
          onClick={() => props.setOpen(!props.open)} to="/about" className="inlink-padding">About</Link>
                <Link to='/careers' onClick={() => props.setOpen(!props.open)}

          style={{
          color:props.dark? 'white':'black'
        }}
          onClick={() => props.setOpen(!props.open)} to="/careers" className="inlink-padding">Careers</Link>

                <Link to='/demo' onClick={() => props.setOpen(!props.open)}

        style={{
          color:props.dark? 'white':'black'
        }}
        className="cursor-pointer" onClick={() => props.setOpen(!props.open)} to="/demo" >Demo</Link>
        <Link 
        style={{
          color:props.dark? 'white':'black'
        }}
        className="cursor-pointer" onClick={() => {
          props.setDark(!props.dark)
          props.setOpen(false)
        }} > {props.dark? "Light mode":"Dark mode"} </Link>

      </div>
    </>
  );
}