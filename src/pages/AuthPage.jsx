import { useState } from "react";
import { motion } from "motion/react";
import "./Auth.css";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import Typewriter from "../assets/elements/Typewriter";

export default function AuthPage() {
  const display_text = 'EchoGraph'
  const [mode, setMode] = useState("login"); // login | register



  const [fname, setFname] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [email, setEmail] = useState('');


  const handleLogin = async () => {

    console.log("++++++++++++++++++++++++++");
    console.log("I was called");

    let payload = {};

    if (mode === "login") {
      payload = {
        email,
        password
      }

      console.log('logging............');
      

      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");


      console.log(payload);
      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
      

    }
    else if (mode === "register") {


      const fullName = fname.split(' ');

      console.log(fullName);


      let firstname = fullName[0];      //changed the var value of fname to avoid server error for now

      let lastname = '';

      if (fullName[1]) {
        lastname = fullName[1];
      }

      console.log("Payload data.............");


      payload = {
        firstname,
        lastname,
        email,
        password
      }

      console.log("Will send");

      console.log(payload);
      
      


    }




    try {
      const response = await fetch(`http://127.0.0.1:8000/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      

      const data = await response.json();
      console.log("Response", data);




    } catch (err) {
      console.log("Error:", err);

    }
  }







  return (
    <div className="auth-wrapper">



      {/* Card */}
      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="auth-card"
      >

        <div className="hero-auth">
          <Typewriter show_text={display_text} />
        </div>


        <h2 className="auth-title"
          style={{
            color: '#095285'
          }}
        >
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h2>

        <p className="auth-subtitle">
          {mode === "login"
            ? "Login to get your context again"
            : "Sign up to start using EchoGraph"}
        </p>

        {/* Inputs */}
        {mode === "register" && (
          <div className="input-box">
            <User size={18} />
            <input type="text" placeholder="Full Name" value={fname} onChange={(e) => setFname(e.target.value)} />
          </div>
        )}

        <div className="input-box">
          <Mail size={18} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="input-box">
          <Lock size={18} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {mode === "register" && (
          <div className="input-box">
            <Lock size={18} />
            <input type="password" placeholder="Confirm Password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
          </div>
        )}

        {/* Button */}
        <button className="primary-btn" onClick={handleLogin}>
          {mode === "login" ? "Login" : "Create Account"}

        </button>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Google Auth */}
        <button className="google-btn"

        >

          {mode === "login" ? "Continue with Google" : "Connect with Google"}



        </button>

        {/* Switch */}
        <p className="switch-text">
          {mode === "login"
            ? "Don’t have an account?"
            : "Already have an account?"}
          <span onClick={() => setMode(mode === "login" ? "register" : "login")}>
            {mode === "login" ? " Register" : " Login"}
          </span>
        </p>
      </motion.div>
    </div>
  );
}