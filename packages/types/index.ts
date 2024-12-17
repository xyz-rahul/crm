export type User = {
    _id?: string
    name: string
    email: string
    password: string
    role: 'admin' | 'manager' | 'employee' | 'agent'
    managerId?: string
    createdAt?: Date
    updatedAt?: Date
}

