import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store} from './app/store.js'
import { ThemeProvider } from "@material-tailwind/react";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <Provider store={store}>
                    <div className='font-[arial] tracking-wide'>
                        <App />
                    </div>
                </Provider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>
)
