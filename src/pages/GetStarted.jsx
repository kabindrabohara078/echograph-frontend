import React from 'react'
import './GetStarted.css'
import { Link } from 'react-router-dom';

const GetStarted = () => {
  return (
    <div className='getstarted-main'>
      
      <div
      
      className="logoish-icon-getstarted inline-flex items-center justify-center gap-2 px-5 py-5 rounded-full border-2 border-[#4226AA]/30 bg-[#4226AA]/5 mb-12">
        
        <Link to='/start'>
        
        
        <span className="text-[#4226AA] font-bold uppercase tracking-wide">Get Started</span>
        </Link>
      </div>


      <div      
      className="logoish-icon-demo inline-flex items-center justify-center gap-2 px-5 py-5 rounded-full border-2 border-[#4226AA]/30 bg-[#4226AA]/5 mb-12">
        <Link to='/demo'>
        
        
        <span className="text-[#4226AA] font-bold uppercase tracking-wide">Demo</span>
        </Link>
      </div>

    </div>
  )
}

export default GetStarted;