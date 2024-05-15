import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app'
import './index.css'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster
      richColors
      toastOptions={{
        style: { background: '#e2e8f0' },
      }}
    />
    <App />
  </React.StrictMode>
)
