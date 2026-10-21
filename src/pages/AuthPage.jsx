import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Sparkles, AlertCircle, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import "./Auth.css";
import { API_URL } from "../config/api";

export default function AuthPage(props) {
  const navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAuth = async (e) => {
    if (e) e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (props.method === "register") {
      if (!fname) {
        setError("Full name is required.");
        return;
      }
      if (password !== confPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }
    }

    setLoading(true);

    try {
      let payload = {};
      const endpoint = props.method === "login" ? "login" : "register";

      if (props.method === "login") {
        payload = { email, password };
      } else {
        const fullName = fname.trim().split(" ");
        const firstname = fullName[0];
        const lastname = fullName.slice(1).join(" ") || "";
        payload = { firstname, lastname, email, password };
      }

      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Authentication failed. Please verify credentials.");
        return;
      }

      if (props.method === "register") {
        setSuccess("Account registered! Signing you in...");
        const loginRes = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        const loginData = await loginRes.json();
        if (loginRes.ok && loginData.access_token) {
          if (props.updateAuth) props.updateAuth(loginData.access_token, email, loginData.name || fname);
          setTimeout(() => navigate("/test"), 800);
        } else {
          props.setMethod("login");
        }
      } else if (data.access_token) {
        if (props.updateAuth) props.updateAuth(data.access_token, email, data.name || email.split("@")[0]);
        setTimeout(() => navigate("/test"), 800);
      }
    } catch (err) {
      console.error(err);
      setError("Internal server Error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await fetch(`${API_URL}/google-auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: credentialResponse.credential })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || "Google authentication failed.");
        return;
      }

      if (props.updateAuth) {
        props.updateAuth(data.access_token, data.email, data.name);
      } else {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user_email", data.email);
        localStorage.setItem("user_name", data.name || "");
      }

      setSuccess("Google login successful!");
      setTimeout(() => navigate("/test"), 800);
    } catch (err) {
      console.error(err);
      setError("Google authentication failed.");
    }
  };

  const isLogin = props.method === "login";

  return (
    <div className="auth-wrapper">
      <br /><br /><br /><br /><br />
      <motion.div
        key={props.method}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="auth-card"
      >
        {/* Brand header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-wider text-blue-400">
              ECHOGRAPH
            </span>
          </div>
        </div>

        <h2 className="auth-title">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2> <br />
  

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs flex items-center gap-2 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="mb-4 p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-3">
          {/* Name (Register Only) */}
          {!isLogin && (
            <div className="auth-input-group">
              <User size={16} />
              <input
                type="text"
                placeholder="Full Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                autoComplete="name"
              />
            </div>
          )}

          {/* Email */}
          <div className="auth-input-group">
            <Mail size={16} />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="auth-input-group">
            <Lock size={16} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </div>

          {/* Confirm Password (Register Only) */}
          {!isLogin && (
            <div className="auth-input-group">
              <Lock size={16} />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
          )}

          {/* Submit Button */}
          <br />
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary auth-submit-btn cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>{isLogin ? "Sign In" : "Create Account"}</span>
              </>
            )}
          </button>
        </form>

        {/* Switch Login / Register */}
        <div className="auth-switch">
          {isLogin ? (
            <span>
              Don't have an account?
              <button 
                type="button" 
                onClick={() => { setError(""); setSuccess(""); props.setMethod("register"); }}
              >
                Register
              </button>
            </span>
          ) : (
            <span>
              Already have an account?
              <button 
                type="button" 
                onClick={() => { setError(""); setSuccess(""); props.setMethod("login"); }}
              >
                Sign In
              </button>
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
