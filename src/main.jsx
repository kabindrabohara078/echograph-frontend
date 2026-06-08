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
      clientId="865104194236-93jf4vlg7r9t2i3c19kqgejqb35mn1kl.apps.googleusercontent.com"
    >

      <App />

    </GoogleOAuthProvider>

  </StrictMode>,
)