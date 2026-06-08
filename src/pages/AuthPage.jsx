
import {
  GoogleLogin
} from "@react-oauth/google";

import { useState } from "react";

import { motion } from "motion/react";

import { useNavigate } from "react-router-dom";


import "./Auth.css";

import {
  Mail,
  Lock,
  User
} from "lucide-react";

import Typewriter from "../assets/elements/Typewriter";

export default function AuthPage() {

  const navigate = useNavigate();


  // ========================================================
  // STATE
  // ========================================================

  const display_text = "EchoGraph";

  const [mode, setMode] = useState("login");

  const [fname, setFname] = useState("");

  const [password, setPassword] = useState("");

  const [confPassword, setConfPassword] = useState("");

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // ========================================================
  // BACKEND URL
  // ========================================================

  const API_URL = "http://127.0.0.1:8000";

  // ========================================================
  // NORMAL AUTH
  // ========================================================

  const handleAuth = async () => {

    setError("");
    setSuccess("");

    // ========================================================
    // VALIDATIONS
    // ========================================================

    if (!email || !password) {

      setError("Please fill all fields");

      return;
    }

    if (mode === "register") {

      if (!fname) {

        setError("Full name required");

        return;
      }

      if (password !== confPassword) {

        setError("Passwords do not match");

        return;
      }

      if (password.length < 6) {

        setError("Password must be at least 6 characters");

        return;
      }
    }

    setLoading(true);

    let conn_method = "";

    try {

      let payload = {};

      // ========================================================
      // LOGIN
      // ========================================================

      if (mode === "login") {

        conn_method = "login";

        payload = {
          email,
          password
        };
      }

      // ========================================================
      // REGISTER
      // ========================================================

      else {

        conn_method = "register";

        const fullName = fname.trim().split(" ");

        const firstname = fullName[0];

        const lastname = fullName.slice(1).join(" ");

        payload = {
          firstname,
          lastname,
          email,
          password
        };
      }

      // ========================================================
      // API CALL
      // ========================================================

      const response = await fetch(
        `${API_URL}/${mode}`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();

      // ========================================================
      // ERROR
      // ========================================================

      if (!response.ok) {

        setError(
          data.detail || "Something went wrong"
        );

        return;
      }

      // ========================================================
      // SUCCESS
      // ========================================================

      if (data.access_token) {

        localStorage.setItem(
          "token",
          data.access_token
        );

        localStorage.setItem(
          "user_email",
          email
        );

        setSuccess("Authentication successful");


        setTimeout(() => {
          navigate("/test");
        }, 2000);



        setSuccess(
          data.message || "Success"
        );
      }
    }

    catch (err) {

      console.log(err);

      setError(
        "Server connection failed"
      );
    }

    finally {

      setLoading(false);
    }

  }
  // ========================================================
  // GOOGLE AUTH
  // ========================================================

  const handleGoogleSuccess = async (
    credentialResponse
  ) => {

    try {

      const response = await fetch(
        `${API_URL}/google-auth`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            credential:
              credentialResponse.credential
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {

        setError(
          data.detail || "Google auth failed"
        );

        return;
      }

      // ========================================================
      // SAVE JWT
      // ========================================================

      localStorage.setItem(
        "token",
        data.access_token
      );

      localStorage.setItem(
        "user_email",
        data.email
      );

      setSuccess(
        "Google authentication successful"
      );

  

      console.log(data);

      navigate("/test");
    }

    catch (err) {

      console.log(err);

      setError(
        "Google authentication failed"
      );
    }
  };

  // ========================================================
  // GOOGLE ERROR
  // ========================================================

  const handleGoogleError = () => {

    setError(
      "Google Sign In Failed"
    );
  };

  // ========================================================
  // UI
  // ========================================================

  return (

    <div className="auth-wrapper">

      <motion.div
        key={mode}
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.4
        }}
        className="auth-card"
      >

       

        {/* ================================================= */}
        {/* LOGO */}
        {/* ================================================= */}

        <div className="hero-auth">

          <Typewriter
            show_text={display_text}
          />

        </div>

        {/* ================================================= */}
        {/* TITLE */}
        {/* ================================================= */}

        <h2
          className="auth-title"
          style={{
            color: "#095285"
          }}
        >

          {
            mode === "login"
              ? "Welcome Back"
              : "Create Account"
          }

        </h2>

        <p className="auth-subtitle">

          {
            mode === "login"
              ? "Login to Get Started"
              : "Sign up to start using EchoGraph"
          }

        </p>

        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {
          error && (

            <div
              style={{
                color: "red",
                marginBottom: "10px",
                fontSize: "14px"
              }}
            >
              {error}
            </div>
          )
        }

        {/* ================================================= */}
        {/* SUCCESS */}
        {/* ================================================= */}

        {
          success && (

            <div
              style={{
                color: "green",
                marginBottom: "10px",
                fontSize: "14px"
              }}
            >
              {success}
            </div>
          )
        }

        {/* ================================================= */}
        {/* REGISTER NAME */}
        {/* ================================================= */}

        {
          mode === "register" && (

            <div className="input-box">

              <User size={18} />

              <input
                type="text"
                placeholder="Full Name"
                value={fname}
                onChange={(e) =>
                  setFname(e.target.value)
                }
              />

            </div>
          )
        }

        {/* ================================================= */}
        {/* EMAIL */}
        {/* ================================================= */}

        <div className="input-box">

          <Mail size={18} />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        {/* ================================================= */}
        {/* PASSWORD */}
        {/* ================================================= */}

        <div className="input-box">

          <Lock size={18} />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

        </div>

        {/* ================================================= */}
        {/* CONFIRM PASSWORD */}
        {/* ================================================= */}

        {
          mode === "register" && (

            <div className="input-box">

              <Lock size={18} />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confPassword}
                onChange={(e) =>
                  setConfPassword(e.target.value)
                }
              />

            </div>
          )
        }

        {/* ================================================= */}
        {/* MAIN BUTTON */}
        {/* ================================================= */}

        <button
          className="primary-btn"
          onClick={handleAuth}
          disabled={loading}
        >

          {
            loading
              ? "Please wait..."
              : (
                mode === "login"
                  ? "Login"
                  : "Create Account"
              )
          }

        </button>

        {/* ================================================= */}
        {/* DIVIDER */}
        {/* ================================================= */}

        <div className="divider">
          OR
        </div>

        {/* ================================================= */}
        {/* GOOGLE AUTH */}
        {/* ================================================= */}

        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >

          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
          />

        </div>

        {/* ================================================= */}
        {/* SWITCH */}
        {/* ================================================= */}

        <p className="switch-text">

          {
            mode === "login"
              ? "Don’t have an account?"
              : "Already have an account?"
          }

          <span
            onClick={() =>
              setMode(
                mode === "login"
                  ? "register"
                  : "login"
              )
            }
          >

            {
              mode === "login"
                ? " Register"
                : " Login"
            }

          </span>

        </p>

      </motion.div>

    </div>
  );
}
