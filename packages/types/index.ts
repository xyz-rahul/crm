export type User = {
    _id?: string
    name: string
    email: string
    password: string
    role: 'admin' | 'manager' | 'employee' | 'agent'
    managerId?: string
    createdAt?: string
    updatedAt?: string
}

export type UserAllResponse = {
    users: User[],
    pageInfo: {
        totalCount: string
    }
}

export interface Lead {
    _id?: string;
    name?: string;
    email?: string;
    phone?: string;
    status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'archived';
    userId?: string;
}
export interface LeadResponse {
    _id: string;
    name: string;
    email: string;
    phone: string;
    status: 'new' | 'contacted' | 'qualified' | 'converted' | 'archived';
    userId: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    user: {
        _id: string;
        name: string;
        role: 'admin' | 'manager' | 'agent';
    };
}

export interface LeadsResponse {
    leads: LeadResponse[];
    pageInfo: {
        totalCount: number;
    };

}

export type SearchItem = {
  _id: string;
  name: string;
  type: string;
};

