import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./../public/profile.css"
import App from './App.jsx'
import Profile from './components/profile.jsx';

createRoot(document.getElementById('root')).render(
  
    <App />
  ,
)
