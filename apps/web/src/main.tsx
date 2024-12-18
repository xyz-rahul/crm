import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
import { Dashboard } from '@/components/Dashboard.tsx';
import { Home } from '@/components/Home.tsx';
import Login from '@/components/Login.tsx';
import SignUp from '@/components/SignUp.tsx';
import Leads from '@/components/Leads.tsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import LeadInfo from './components/LeadInfo.tsx';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />}>
                        <Route index element={<Home />} />
                        <Route path="leads" element={<Leads />} />
                        <Route path="lead/:id" element={<LeadInfo />} />
                    </Route>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    </StrictMode>,
)
