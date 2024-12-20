import AppSidebar from '@/components/AppSidebar'
import { Outlet, useNavigate } from 'react-router'
import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { Loader } from './ui/custom/Loader'

const fetchAuthStatus = async () => {
    const response = await axios.get('/api/auth/isLoggedIn');
    return response.data; // Return user data or status
};
export const Dashboard = () => {
    const navigate = useNavigate();

    const { data: user, isLoading, isError, error } = useQuery(
        ['authStatus'],
        fetchAuthStatus,
        {
            retry: false, // Disable retries for 403 errors
            onError: (error) => {
                if (error instanceof AxiosError && error.response?.status === 403) {
                    navigate('/login'); // Redirect on 403 error
                } else {
                    console.error('An unexpected error occurred:', error);
                }
            },
        }
    );

    if (isLoading) {
        console.log('is loading')
        return <Loader />
    }

    if (isError || !user) {
        console.log(error)
        navigate('/login')
    }

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

