import React, { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HamburgerMenu from './assets/elements/HamburgerMenu';
import EchoGraphLanding from './pages/EchoGraphLanding';
import Memory from './pages/Memory';
import Navbar from './assets/elements/Navbar';

const App = () => {

  const [notice, setNotice] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <BrowserRouter>
        <div className="main-app">

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
                <a href="/">
                <img src="/app-logo.png" alt="" />
                </a>
              </div>

              <div className="hamburger-logo">
                <HamburgerMenu open = {open} setOpen={setOpen}/>
              </div>



            </div>

            <div className="line"></div>

          </nav>

        < Navbar open={open} setOpen={setOpen}/>

        <div className="page-content">


        <Routes>

          <Route path='/' element={<EchoGraphLanding/>}/>
          <Route path='/start' element={<Memory/>}/>
          <Route path='/features' element={<Memory/>}/>
          <Route path='/demo' element={<Memory/>}/>

          <Route path='/memory' element={<Memory/>}/>
          <Route path='/docs' element={<Memory/>}/>
          <Route path='/about' element={<Memory/>}/>
          <Route path='/careers' element={<Memory/>}/>
          
        </Routes>

        </div>
        </div>

      </BrowserRouter>
    </>
  )
}

export default App