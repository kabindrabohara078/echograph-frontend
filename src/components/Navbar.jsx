import { Link, useNavigate } from "react-router-dom";
import './Navbar.css'
import HamburgerMenu from "./HamburgerMenu";

const Navbar = (props) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (props.updateAuth) {
            props.updateAuth("", "", "");
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("user_email");
            localStorage.removeItem("user_name");
        }
        navigate("/");
    };

    const displayName = props.userName || (props.userEmail ? props.userEmail.split('@')[0] : "User");

    return (
        <nav className={`fixed top-0 left-0 w-full h-20 z-50 bg-${props.dark ? 'black' : 'white'} backdrop-blur-md border-b border-gray-800 px-4 sm:px-6 py-4 flex items-center justify-between`}>
            <div className="flex items-center space-x-2 shrink-0">
                <Link to='/'>
                    <span className={`text-xl font-bold text-${props.dark ? "white" : "black"} tracking-tight`}>EchoGraph</span>
                </Link>
            </div>

            <div className={`hidden md:flex items-center space-x-6 lg:space-x-8 text-sm text-${props.dark ? "white" : 'black'} font-medium`}>
                <Link to="/products" className="hover:text-cyan-400 transition-colors">Products</Link>
                <Link to="/memory" className="hover:text-cyan-400 transition-colors">Memory Engine</Link>
                <Link to="/docs" className="hover:text-cyan-400 transition-colors">Docs</Link>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">About</Link>
                <Link to="/test" className="px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 font-semibold transition-all flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    Playground
                </Link>
            </div>

            <div className="nav-top-right-pc">
                <div className="flex items-center gap-3">
                    <div className="mode-switch flex justify-center items-center cursor-pointer p-1.5 rounded-lg hover:bg-gray-800/20 transition-colors"
                        onClick={() => props.setDark(!props.dark)}
                    >
                        <img src={props.dark ? "/svg/sun-light-theme.svg" : "/svg/sun-dark-theme.svg"} className="h-5 w-5" alt="Theme Toggle" />
                    </div>

                    {props.token ? (
                        <div className="flex items-center gap-3 shrink-0">
                            <Link to="/test" className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full ${props.dark ? 'bg-gray-800 text-gray-200 border border-gray-700' : 'bg-gray-200 text-gray-800'} hover:opacity-90 transition-opacity`}>
                                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center text-[10px] font-bold uppercase shrink-0">
                                    {displayName[0]}
                                </div>
                                <span className="font-semibold text-xs max-w-[120px] truncate">{displayName}</span>
                            </Link>

                            <button 
                                onClick={handleLogout}
                                className="cursor-pointer bg-red-500/10 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 shrink-0">
                            <Link to="/auth" onClick={() => props.setAuthMode("login")} className={`${props.dark ? "text-white" : "text-black"} login flex justify-center items-center cursor-pointer hover:text-cyan-400 transition-colors text-sm`}>
                                Login
                            </Link>

                            <Link to="/auth" onClick={() => props.setAuthMode("register")} className="signup cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-opacity">
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
    );
};

export default Navbar;