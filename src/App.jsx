import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing';
import Memory from './pages/Memory';
import Navbar from './assets/components/Navbar';
import AuthPage from './pages/AuthPage';
import Demo from './pages/Demo';
import Footer from './assets/components/Footer';
import Test from './pages/Test';
// import ScrollNavbar from './assets/components/ScrollNavbar';


const App = () => {




  return (
    <>
      <BrowserRouter>
        <div className="main-app">

          <div className="header">

          < Navbar />
          {/* < ScrollNavbar /> */}

          </div>


          <div className="page-content">

            <Routes>

              <Route path='/' element={<Landing />} />
              <Route path='/start' element={< AuthPage />} />
              <Route path='/features' element={<Memory />} />
              <Route path='/demo' element={< Demo />} />

              <Route path='/memory' element={<Memory />} />
              <Route path='/docs' element={<Memory />} />
              <Route path='/about' element={<Memory />} />
              <Route path='/careers' element={<Memory />} />



              <Route path='/test' element={< Test />} />

            </Routes>

          </div>

          <div className="footer">

            < Footer />
          </div>

        </div>

      </BrowserRouter>
    </>
  )
}

export default App