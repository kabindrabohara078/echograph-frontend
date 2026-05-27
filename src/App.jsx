import React, { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HamburgerMenu from './assets/elements/HamburgerMenu';

const App = () => {

  const [notice, setNotice] = useState(true);
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

            <div className="mobile-header">

              <div className="app-logo">
                <img src="/app-logo.png" alt="" />
              </div>

              <div className="hamburger-logo">
                <HamburgerMenu/>
              </div>

            </div>

          </nav>

        <Routes>

          <Route element={}/>
          <Route element={}/>
          <Route element={}/>
          <Route element={}/>
          <Route element={}/>

        </Routes>

        </div>

      </BrowserRouter>
    </>
  )
}

export default App