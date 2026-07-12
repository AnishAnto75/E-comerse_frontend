import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "@material-tailwind/react";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <div className='font-inter'>
                    <App />
                </div>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
)
