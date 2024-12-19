import { useAuthStore } from '@/lib/authStore';
import AppSidebar from '@/components/AppSidebar'
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router'

export const Dashboard = () => {
    const navigate = useNavigate();
    const getUser = useAuthStore.getUser;
    useEffect(() => {
        if (!getUser()) navigate('/login')
    }, [])
    return (
        <>
            <div className="flex">
                <AppSidebar />
                <div className='w-full'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
