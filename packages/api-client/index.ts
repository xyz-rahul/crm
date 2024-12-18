import { Lead, LeadResponse, LeadsResponse, SearchItem, User, UserAllResponse } from '@myorg/types';
import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function login(data:
    {
        email: string;
        password: string;
    }
): Promise<User> {
    try {
        const response: AxiosResponse<User> = await api.post('/auth/login', data);
        return response.data;
    } catch (error: any) {
        if (error instanceof AxiosError) throw new Error(error.response?.data?.message || 'Internal Server Error');
        throw new Error('Internal Server Error');
    }
};

export async function signup(data:
    {
        name: string,
        email: string;
        password: string;
    }
): Promise<User> {
    try {
        const response: AxiosResponse<User> = await api.post('/auth/signup', data);
        if (response.status === 201 || response.status === 200) return response.data;
        else throw new Error('Internal Server Error');
    } catch (error: any) {
        if (error instanceof AxiosError) throw new Error(error.response?.data?.message || 'Internal Server Error');
        throw new Error('Internal Server Error');
    }
};


export async function isLoggedIn(): Promise<User> {
    try {
        const response: AxiosResponse<User> = await api.get('/auth/isLoggedIn');
        return response.data;
    } catch (error: any) {
        if (error instanceof AxiosError) throw new Error(error.response?.data?.message || 'Internal Server Error');
        throw new Error('Internal Server Error');
    }
};
export async function logout() {
    try {
        await api.delete('/auth/logout');
    } catch (error: any) {
        if (error instanceof AxiosError) throw new Error(error.response?.data?.message || 'Internal Server Error');
        throw new Error('Internal Server Error');
    }
};

export async function createLead(data: Lead) {
    try {
        console.log('create lead', data)
        const response: AxiosResponse<Lead> = await api.post('/lead', data);
        console.log('response', response)
        return response.data;
    } catch (error: any) {
        if (error instanceof AxiosError) throw new Error(error.response?.data?.message || 'Internal Server Error');
        throw new Error('Internal Server Error');
    }
}

export async function getAllLeads(page?: string | number) {
    try {
        console.log('get all lead')
        const response: AxiosResponse<LeadsResponse> = await api.get(`/lead?page=${page}`);
        return response.data;
    } catch (error: any) {
        if (error instanceof AxiosError) throw new Error(error.response?.data?.message || 'Internal Server Error');
        throw new Error('Internal Server Error');
    }
};

export async function getLeadById(id: string) {
    try {
        const response: AxiosResponse<LeadResponse> = await api.get(`/lead/${id}`);
        return response.data;
    } catch (error: any) {
        if (error instanceof AxiosError && error.status === 404) throw new Error(error.response?.data?.message || 'Lead not found');
        else if (error instanceof AxiosError) throw new Error(error.response?.data?.message || 'Internal Server Error');
        throw new Error('Internal Server Error');
    }
};
export async function updateLeadById(id: string, data: Lead) {
    try {
        const response: AxiosResponse<LeadResponse> = await api.put(`/lead/${id}`, data);
        return response.data;
    } catch (error: any) {
        if (error instanceof AxiosError && error.status === 404) throw new Error(error.response?.data?.message || 'Lead not found');
        else if (error instanceof AxiosError) throw new Error(error.response?.data?.message || 'Internal Server Error');
        throw new Error('Internal Server Error');
    }
};

export async function getLeadReport() {
    try {
        const response: AxiosResponse<{
            thisYear: { count: number },
            thisMonth: { count: number },
            thisWeek: { count: number }
        }> = await api.get(`/report/lead`);
        return response.data;
    } catch (error: any) {
        if (error instanceof AxiosError && error.status === 404) throw new Error(error.response?.data?.message || 'Lead not found');
        else if (error instanceof AxiosError) throw new Error(error.response?.data?.message || 'Internal Server Error');
        throw new Error('Internal Server Error');
    }
};


export async function getAllUsers(page?: string | number) {
    try {
        const response: AxiosResponse<UserAllResponse> = await api.get(`/user?page=${page}`);
        return response.data;
    } catch (error: any) {
        if (error instanceof AxiosError) throw new Error(error.response?.data?.message || 'Internal Server Error');
        throw new Error('Internal Server Error');
    }
}

export async function getUserById(id: string) {
    try {
        const response: AxiosResponse<User> = await api.get(`/user/${id}`);
        return response.data;
    } catch (error: any) {
        if (error instanceof AxiosError && error.status === 404) throw new Error(error.response?.data?.message || 'Lead not found');
        else if (error instanceof AxiosError) throw new Error(error.response?.data?.message || 'Internal Server Error');
        throw new Error('Internal Server Error');
    }
};

export async function getSearchResult(key: string) {
    try {
        const response: AxiosResponse<SearchItem[]> = await api.get(`/search/${key}`);
        return response.data;
    } catch (error: any) {
        if (error instanceof AxiosError && error.status === 404) throw new Error(error.response?.data?.message || 'Lead not found');
        else if (error instanceof AxiosError) throw new Error(error.response?.data?.message || 'Internal Server Error');
        throw new Error('Internal Server Error');
    }
};
