// ==========================================
// 1. PERSISTENT NAVBAR

import { Link } from "react-router-dom";
import './Navbar.css'
import HamburgerMenu from "./HamburgerMenu";

// ==========================================
const Navbar = (props) => {
    return (
        <nav className={`fixed top-0 left-0 w-full h-20 z-50 bg-${props.dark ? '[#0B0F19]/80' : 'white'} backdrop-blur-md border-b border-gray-800 px-6 py-4 flex items-center justify-between`}

        >
            <div className="flex items-center space-x-2">
                <Link to='/'>
                    <span className={`text-xl font-bold text-${props.dark ? "white" : "black"} tracking-tight`}>EchoGraph</span>
                </Link>
            </div>

            <div className={`hidden md:flex items-center space-x-8 text-sm text-${props.dark ? "white" : 'black'} font-medium`}>
                <Link to="/products" className="hover:text-cyan-400 transition-colors">Products</Link>
                <Link to="/memory" className="hover:text-cyan-400 transition-colors">Memory Engine</Link>
                <Link to="/docs" className="hover:text-cyan-400 transition-colors">Docs</Link>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">About</Link>
                <Link to="/test" className="hover:text-cyan-400 transition-colors">Test</Link>
            </div>



            <div className="nav-top-right-pc">

                <div className="flex h-20 gap-5">

                    <div className="mode-switch flex justify-center items-center cursor-pointer"
                    onClick={()=> props.setDark(!props.dark)}
                    >
                        <img src={props.dark ? "/svg/sun-light-theme.svg" : "/svg/sun-dark-theme.svg"} className="h-5 w-5" alt="" />
                    </div>

                    <div className={`${props.dark? "text-white":"text-black"} login flex justify-center items-center`}>
                        Login
                    </div>

                    <div className="h-20 flex justify-center items-center">
                        <div className="signup cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-opacity">
                            Sign Up
                        </div>
                    </div>



                </div>
            </div>

            {/* <button className="cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-cyan-500/20 hover:opacity-90 transition-opacity">
                        Sign Up
                    </button>
 */}




            <div className="nav-top-right-mobile">
                <HamburgerMenu open={props.open} setOpen={props.setOpen} />
            </div>

        </nav>
    );
};

export default Navbar;