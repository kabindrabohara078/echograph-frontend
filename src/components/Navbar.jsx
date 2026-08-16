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
        <nav className={`fixed top-0 left-0 w-full h-20 z-50 ${props.dark ? 'bg-[#111111] border-slate-800' : 'bg-[#FAFAFA] border-slate-200'} border-b px-4 sm:px-6 py-4 flex items-center justify-between`}>
            <div className="flex items-center space-x-2 shrink-0">
                <Link to='/'>
                    <span className={`text-xl font-bold ${props.dark ? "text-slate-100" : "text-slate-900"} tracking-tight`}>EchoGraph</span>
                </Link>
            </div>

            <div className={`hidden md:flex items-center space-x-6 lg:space-x-8 text-sm ${props.dark ? "text-slate-300" : 'text-slate-600'} font-medium`}>
                <Link to="/products" className={`hover:text-blue-500 transition-colors`}>Products</Link>
                <Link to="/memory" className={`hover:text-blue-500 transition-colors`}>Memory Engine</Link>
                <Link to="/docs" className={`hover:text-blue-500 transition-colors`}>Docs</Link>
                <Link to="/about" className={`hover:text-blue-500 transition-colors`}>About</Link>
                <Link to="/test" className={`px-3 py-1.5 rounded-full border font-semibold transition-all flex items-center gap-1.5 ${props.dark ? 'bg-slate-900 border-slate-700 text-slate-100 hover:border-slate-500' : 'bg-white border-slate-300 text-slate-900 hover:border-slate-500'}`}>
                    Playground
                </Link>
            </div>

            <div className="nav-top-right-pc">
                <div className="flex items-center gap-3">
                    <div className={`mode-switch flex justify-center items-center cursor-pointer p-1.5 rounded-lg transition-colors ${props.dark ? 'hover:bg-slate-800' : 'hover:bg-slate-200'}`}
                        onClick={() => props.setDark(!props.dark)}
                    >
                        <img src={props.dark ? "/svg/sun-light-theme.svg" : "/svg/sun-dark-theme.svg"} className="h-5 w-5" alt="Theme Toggle" />
                    </div>

                    {props.token ? (
                        <div className="flex items-center gap-3 shrink-0">
                            <Link to="/test" className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full border transition-opacity ${props.dark ? 'bg-slate-900 text-slate-200 border-slate-700 hover:border-slate-500' : 'bg-white text-slate-800 border-slate-300 hover:border-slate-500'}`}>
                                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold uppercase shrink-0">
                                    {displayName[0]}
                                </div>
                                <span className="font-semibold text-xs max-w-[120px] truncate">{displayName}</span>
                            </Link>

                            <button 
                                onClick={handleLogout}
                                className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 border ${props.dark ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-black'}`}
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 shrink-0">
                            <Link to="/auth" onClick={() => props.setAuthMode("login")} className={`flex justify-center items-center cursor-pointer hover:text-blue-500 transition-colors text-sm ${props.dark ? "text-slate-300" : "text-slate-600"}`}>
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
    );
};

export default Navbar;