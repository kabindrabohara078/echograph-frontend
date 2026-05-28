import { useState } from "react";
import { motion } from "motion/react";
import "./Auth.css";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import Typewriter from "../assets/elements/Typewriter";

export default function AuthPage() {
  const display_text = 'EchoGraph'
  const [mode, setMode] = useState("login"); // login | register

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
        <Typewriter show_text={display_text}/>
      </div>


        <h2 className="auth-title"
        style={{
          color:'#095285'
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
            <input type="text" placeholder="Full Name" />
          </div>
        )}

        <div className="input-box">
          <Mail size={18} />
          <input type="email" placeholder="Email" />
        </div>

        <div className="input-box">
          <Lock size={18} />
          <input type="password" placeholder="Password" />
        </div>

        {mode === "register" && (
          <div className="input-box">
            <Lock size={18} />
            <input type="password" placeholder="Confirm Password" />
          </div>
        )}

        {/* Button */}
        <button className="primary-btn">
          {mode === "login" ? "Login" : "Create Account"}
          
        </button>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Google Auth */}
        <button className="google-btn">

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