import { useAuthStore } from '@/lib/authStore';
import AppSidebar from '@/components/AppSidebar'
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"


export const Dashboard = (props: {}) => {
    const navigate = useNavigate();
    const isLoggedIn = useAuthStore.isUserLoggedIn;
    useEffect(() => {
        if (!isLoggedIn) navigate('/login')
    }, [])
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger />
                <div className='w-full'>
                    <Outlet />
                </div>
            </SidebarProvider>
        </>
    )
}
