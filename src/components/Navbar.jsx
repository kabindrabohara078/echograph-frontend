import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'
import HamburgerMenu from "./HamburgerMenu";
import UserSettingsModal from "./UserSettingsModal";
import { Settings } from "lucide-react";

const Navbar = (props) => {
    const navigate = useNavigate();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleLogout = () => {
        if (props.updateAuth) {
            props.updateAuth("", "", "");
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user_email");
            localStorage.removeItem("user_name");
        }
        setIsSettingsOpen(false);
        navigate("/");
    };

    const displayName = props.userName || (props.userEmail ? props.userEmail.split('@')[0] : "User");

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full h-20 z-50 ${props.dark ? 'bg-[#111111] border-slate-800' : 'bg-[var(--bg-secondary)] border-[var(--border-color)]'} border-b px-4 sm:px-6 py-4 flex items-center justify-between`}>
                <div className="flex items-center space-x-2 shrink-0">
                    <Link to='/'>
                        <span className={`text-xl font-bold ${props.dark ? "text-slate-100" : "text-slate-900"} tracking-tight`}>EchoGraph</span>
                    </Link>
                </div>

                <div className={`hidden md:flex items-center space-x-6 lg:space-x-8 text-sm ${props.dark ? "text-slate-300" : 'text-slate-600'} font-medium`}>
                    <Link to="/" className={`hover:text-blue-500 transition-colors`}>Home</Link>
                    <Link to="/products" className={`hover:text-blue-500 transition-colors`}>Products</Link>
                    <Link to="/memory" className={`hover:text-blue-500 transition-colors`}>Memory Engine</Link>
                    <Link to="/docs" className={`hover:text-blue-500 transition-colors`}>Docs</Link>
                    <Link to="/about" className={`hover:text-blue-500 transition-colors`}>About</Link>
                    <Link to="/test" className={`px-3 py-1.5 rounded-full border font-semibold transition-all flex items-center gap-1.5 ${props.dark ? 'border-blue-400 hover:border-slate-500' : 'bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--border-hover)]'}`}>
                        Playground
                    </Link>
                </div>

                <div className="nav-top-right-pc">
                    <div className="flex items-center gap-3">
                        {props.token ? (
                            /* Logged in: Named logo button pops Settings (with theme & logout inside) */
                            <button
                                type="button"
                                onClick={() => setIsSettingsOpen(true)}
                                className={`flex items-center gap-2.5 text-xs font-semibold px-3 py-1.5 cursor-pointer`}
                                title="Click for Settings, Theme, Profile & Logout"
                            >
                                <Settings className="w-3.5 h-3.5 ml-0.5" />
                            </button>
                        ) : (
                            /* Logged out: Show Theme Toggle + Login + Sign Up */
                            <div className="flex items-center gap-3 shrink-0">
                                <Link to="/auth" onClick={() => props.setAuthMode("login")} className={`flex justify-center items-center px-4 py-2 rounded-lg border border-white cursor-pointer hover:text-blue-500 transition-colors text-sm ${props.dark ? "text-slate-300" : "text-slate-600"}`}>
                                    Login
                                </Link>

                                <Link to="/auth" onClick={() => props.setAuthMode("register")} className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold transition-colors border ${props.dark ? 'bg-slate-100 text-black hover:bg-white border-slate-100' : 'bg-slate-900 text-white hover:bg-black border-slate-900'}`}>
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                <div className="nav-top-right-mobile">
                    <HamburgerMenu open={props.open} setOpen={props.setOpen} dark={props.dark}/>
                </div>
            </nav>

            {/* Settings Modal (Theme, Profile Name, Password, Engine Defaults, Logout) */}
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
};

export default Navbar;