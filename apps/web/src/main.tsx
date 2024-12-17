import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
import { Dashboard } from '@/components/Dashboard.tsx';
import { Home } from '@/components/Home.tsx';
import Login from '@/components/Login.tsx';
import SignUp from './components/SignUp.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="dashboard" element={<Dashboard />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/" element={<App />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
