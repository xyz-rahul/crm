import mongoose from "mongoose";

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'manager' | 'employee';
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ILead {
    _id?: string; // MongoDB ObjectId as string
    name: string;
    email?: string; // Optional field
    phone?: string; // Optional field
    status: 'new' | 'contacted' | 'qualified' | 'converted' | 'archived';
    userId?: string; // References the User ObjectId
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ICustomer {
    _id?: string; // MongoDB ObjectId as string
    name: string;
    email?: string; // Optional field
    phone: string;
    address?: string; // Optional field
    createdFromLead?: string; // References the Lead ObjectId
    userId?: string; // References the User ObjectId
    createdAt?: Date;
    updatedAt?: Date;
}


const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'employee'],
        required: true,
    },
}, { timestamps: true });


const leadSchema = new mongoose.Schema<ILead>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    status: {
        type: String,
        enum: ['new', 'contacted', 'qualified', 'converted', 'archived'],
        default: 'new',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, { timestamps: true });



const customerSchema = new mongoose.Schema<ICustomer>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    createdFromLead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lead',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Lead = mongoose.model('Lead', leadSchema);
const Customer = mongoose.model('Customer', customerSchema);

export { User, Lead, Customer };

