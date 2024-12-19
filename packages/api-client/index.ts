import { Lead, LeadResponse, LeadsResponse, SearchItem, User, UserAllResponse, UserResponse } from '@myorg/types';
import axios, { AxiosResponse } from 'axios';

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
    const response: AxiosResponse<User> = await api.post('/auth/login', data);
    return response.data;
};

export async function signup(data:
    {
        name: string,
        email: string;
        password: string;
    }
): Promise<User> {
    const response: AxiosResponse<User> = await api.post('/auth/signup', data);
    if (response.status === 201 || response.status === 200) return response.data;
    else throw new Error('Internal Server Error');
};


export async function isLoggedIn(): Promise<User> {
    const response: AxiosResponse<User> = await api.get('/auth/isLoggedIn');
    return response.data;
};
export async function logout() {
    await api.delete('/auth/logout');
};

export async function createLead(data: Lead) {
    const response: AxiosResponse<Lead> = await api.post('/lead', data);
    return response.data;
}

export async function getAllLeads(page?: string | number) {
    const response: AxiosResponse<LeadsResponse> = await api.get(`/lead?page=${page}`);
    return response.data;
};

export async function getLeadById(id: string) {
    const response: AxiosResponse<LeadResponse> = await api.get(`/lead/${id}`);
    return response.data;
};
export async function updateLeadById(id: string, data: Lead) {
    const response: AxiosResponse<LeadResponse> = await api.put(`/lead/${id}`, data);
    return response.data;
};

export async function getLeadReport() {
    const response: AxiosResponse<{
        thisYear: { count: number },
        thisMonth: { count: number },
        thisWeek: { count: number }
    }> = await api.get(`/report/lead`);
    return response.data;
};


export async function getAllUsers(page?: string | number) {
    const response: AxiosResponse<UserAllResponse> = await api.get(`/user?page=${page}`);
    return response.data;
}

export async function getUserById(id: string) {
    const response: AxiosResponse<User> = await api.get(`/user/${id}`);
    return response.data;
};

export async function updateUserById(id: string, data: User) {
    const response: AxiosResponse<UserResponse> = await api.put(`/user/${id}`, data);
    return response.data;
};

export async function getSearchResult(key: string) {
    const response: AxiosResponse<SearchItem[]> = await api.get(`/search/${key}`);
    return response.data;
};
