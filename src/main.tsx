import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HelmetProvider } from 'react-helmet-async' // <-- Přidáno

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider> {/* <-- Přidáno */}
      <App />
    </HelmetProvider> {/* <-- Přidáno */}
  </StrictMode>,
)