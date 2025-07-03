import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BirthdayPage from './BirthdayPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BirthdayPage />
  </StrictMode>,
)
