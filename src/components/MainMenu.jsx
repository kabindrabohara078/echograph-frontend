import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MainMenu.css";
import UserSettingsModal from "./UserSettingsModal";

export default function MainMenu(props) {
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    if (props.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [props.open]);

  const handleLogout = () => {
    if (props.updateAuth) {
      props.updateAuth("", "", "");
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user_email");
      localStorage.removeItem("user_name");
    }
    props.setOpen(false);
    setIsSettingsOpen(false);
    navigate("/");
  };

  return (
    <>
      <div className={`mobile-menu ${props.open ? "show" : ""} top-20`}
        style={{
          backgroundColor: props.dark ? '#222' : 'white',
          color: props.dark ? 'white' : 'black'
        }}
      >
        {props.token ? (
          <div style={{ padding: "12px 0", borderBottom: "1px solid #444", marginBottom: "12px" }}>
            <div style={{ fontSize: "14px", fontWeight: "bold", color: "#38bdf8" }}>
              {props.userName || props.userEmail || "User"}
            </div>
            <button
              type="button"
              onClick={() => {
                props.setOpen(false);
                setIsSettingsOpen(true);
              }}
              style={{
                marginTop: "10px",
                padding: "8px 14px",
                borderRadius: "8px",
                backgroundColor: props.dark ? "#1e293b" : "#e2e8f0",
                color: props.dark ? "#f8fafc" : "#0f172a",
                border: "1px solid #64748b",
                fontWeight: "600",
                fontSize: "12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                width: "100%",
                justifyContent: "center"
              }}
            >
              ⚙️ Account Settings & Theme
            </button>
            <Link 
              to="/test" 
              onClick={() => props.setOpen(false)}
              style={{ color: "#38bdf8", fontWeight: "bold", marginTop: "10px", display: "block", fontSize: "13px" }}
            >
              🚀 Go to Playground (Memory Sandbox)
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "10px", padding: "12px 0" }}>
            <Link 
              to="/auth" 
              onClick={() => { props.setAuthMode && props.setAuthMode("login"); props.setOpen(false); }}
              style={{ padding: "8px 16px", borderRadius: "6px", backgroundColor: "#0284c7", color: "white" }}
            >
              Login
            </Link>
            <Link 
              to="/auth" 
              onClick={() => { props.setAuthMode && props.setAuthMode("register"); props.setOpen(false); }}
              style={{ padding: "8px 16px", borderRadius: "6px", backgroundColor: "#095285", color: "white" }}
            >
              Sign Up
            </Link>
          </div>
        )}

        <Link style={{ color: props.dark ? 'white' : 'black' }} className="cursor-pointer" to='/products' onClick={() => props.setOpen(false)}>Product</Link>
        <Link to='/memory' onClick={() => props.setOpen(false)} style={{ color: props.dark ? 'white' : 'black' }} className="cursor-pointer">Memory Engine</Link>
        <Link to='/docs' onClick={() => props.setOpen(false)} style={{ color: props.dark ? 'white' : 'black' }} className="cursor-pointer">Docs</Link>
        <Link to='/about' onClick={() => props.setOpen(false)} style={{ color: props.dark ? 'white' : 'black' }} className="cursor-pointer">About</Link>
        <Link to='/careers' onClick={() => props.setOpen(false)} style={{ color: props.dark ? 'white' : 'black' }} className="cursor-pointer">Careers</Link>

        {!props.token && (
          <Link 
            style={{ color: props.dark ? 'white' : 'black', marginTop: "16px" }}
            className="cursor-pointer" 
            onClick={() => {
              props.setDark(!props.dark);
              props.setOpen(false);
            }} 
          > 
            {props.dark ? "Switch to Light mode" : "Switch to Dark mode"} 
          </Link>
        )}
      </div>

      <UserSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        dark={props.dark}
        setDark={props.setDark}
        token={props.token}
        userEmail={props.userEmail}
        userName={props.userName}
        updateAuth={props.updateAuth}
        onLogout={handleLogout}
      />
    </>
  );
}