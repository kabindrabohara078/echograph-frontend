import React, { useState } from 'react'
import HamburgerMenu from '../elements/HamburgerMenu';
import MainMenu from '../elements/MainMenu';
import { Link } from 'react-router-dom';
import './edits.css'

const Navbar = () => {

    const [notice, setNotice] = useState(false);
    const [open, setOpen] = useState(false);


    return (
        <div>

            <nav>
                {notice && (
                    <div className="notification">
                        This is a test notification
                    </div>
                )}
                {
                    notice && (
                        <div className="line"></div>

                    )
                }

                <div className="mobile-header">

                    <div className="app-logo">
                        <Link onClick={()=> setOpen(false)} to='/'>
                            <img src="/app-logo.png" alt="" />
                        </Link>

                    </div>

                    <div className="hamburger-logo">
                        <HamburgerMenu open={open} setOpen={setOpen} />
                    </div>



                </div>


            </nav>
            <div style={{
                height: '1px',
                backgroundColor: '#428fc5',
                width: '100%'
            }} className="line"></div>

            < MainMenu open={open} setOpen={setOpen} />


        </div>
    )
}

export default Navbar