import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing';
import Memory from './pages/Memory';
import Navbar from './assets/components/Navbar';


const App = () => {




  return (
    <>
      <BrowserRouter>
        <div className="main-app">

          <div className="header">

          < Navbar />

          </div>


          <div className="page-content">

            <Routes>

              <Route path='/' element={<Landing />} />
              <Route path='/start' element={<Memory />} />
              <Route path='/features' element={<Memory />} />
              <Route path='/demo' element={<Memory />} />

              <Route path='/memory' element={<Memory />} />
              <Route path='/docs' element={<Memory />} />
              <Route path='/about' element={<Memory />} />
              <Route path='/careers' element={<Memory />} />

            </Routes>

          </div>

          <div className="footer">

            <h1>This is footer</h1>
          </div>

        </div>

      </BrowserRouter>
    </>
  )
}

export default App