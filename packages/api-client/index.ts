import { Lead, LeadResponse, LeadsResponse, User } from '@myorg/types';
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

export async function getAllLeads() {
    try {
        const response: AxiosResponse<LeadsResponse> = await api.get('/lead');
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
