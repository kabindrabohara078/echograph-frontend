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
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID || "843357568131-mbobmodtgr67nv8122tn29mkq2ma2ck4.apps.googleusercontent.com"}
    >

      <App />

    </GoogleOAuthProvider>

  </StrictMode>,
)