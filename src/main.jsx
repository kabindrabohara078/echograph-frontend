import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import './index.css'

import App from './App.jsx'

import {
  GoogleOAuthProvider
} from '@react-oauth/google'


createRoot(
  document.getElementById('root')
).render(

  <StrictMode>

    <GoogleOAuthProvider
      clientId="865104194236-ri00saam6ain19tvrlvdlj395qclc5tj.apps.googleusercontent.com"
    >

      <App />

    </GoogleOAuthProvider>

  </StrictMode>,
)