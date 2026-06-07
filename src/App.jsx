import React, { useState } from 'react'
import LandingPage from './pages/LandingPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import Navbar from './components/Navbar'
import MainMenu from './components/MainMenu'
import Test from './pages/Test.jsx'
import ProductsPage from './pages/Products.jsx'
import DemoPage from './pages/Demo.jsx'
import About from './pages/About.jsx'
import Docs from './pages/Docs.jsx'
import Memory from './pages/Memory.jsx'
import Careers from './pages/Careers.jsx'

const App = () => {

  const [dark, setDark] = useState(false)
  const [authMode, setAuthMode] = useState("");
  const [open, setOpen] = useState(false)


  return (
    <div>

      <BrowserRouter>
        <Navbar open={open} setOpen={setOpen} dark={dark} setDark={setDark} authMode={authMode} setAuthMode={setAuthMode} />
        < MainMenu open={open} setOpen={setOpen} dark={dark} setDark={setDark}/>

        <Routes>

          < Route path='/' element={< LandingPage dark={dark} setDark={setDark} />} />
          < Route path='/products' element={< ProductsPage dark={dark}/>} />
          < Route path='/auth' element={< AuthPage method={authMode} setMethod={setAuthMode} dark={dark} setDark={setDark} />} />
          < Route path='/memory' element={< Memory dark={dark} />} />
          < Route path='/docs' element={< Docs dark={dark} />} />
          < Route path='/about' element={< About dark={dark} />} />
          < Route path='/demo' element={< DemoPage dark={dark} />} />
          < Route path='/careers' element={< Careers dark={dark} />} />
          < Route path='/test' element={< Test dark={dark} />} />
          < Route path='*' element={< LandingPage dark={dark} />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App