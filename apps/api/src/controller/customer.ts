import { Request, Response } from 'express';
import { User, Lead, Customer } from '../models';

export const CustomerController = {
    async createCustomer(req: Request, res: Response) {
        const { name, email, phone, address, createdFromLead, userId } = req.body;

        const user = await User.findById(userId);
        if (!user) res.status(404).json({ error: 'User not found' });

        if (createdFromLead) {
            const lead = await Lead.findById(createdFromLead);
            if (!lead) res.status(404).json({ error: 'Lead not found' });
        }

        const customer = new Customer({ name, email, phone, address, createdFromLead, userId });
        const savedCustomer = await customer.save();

        res.status(201).json(savedCustomer);
    },

    async getAllCustomers(req: Request, res: Response) {
        const customers = await Customer.find()
            .populate('createdFromLead', 'name email status') // Populates lead data
            .populate('userId', 'name email role'); // Populates user data
        res.status(200).json(customers);
    },

    async getCustomerById(req: Request, res: Response) {
        const customer = await Customer.findById(req.params.id)
            .populate('createdFromLead', 'name email status') // Populates lead data
            .populate('userId', 'name email role'); // Populates user data
        if (!customer)  res.status(404).json({ error: 'Customer not found' });
        res.status(200).json(customer);
    },

    async updateCustomer(req: Request, res: Response) {
        const { createdFromLead, userId } = req.body;

        if (createdFromLead) {
            const lead = await Lead.findById(createdFromLead);
            if (!lead)  res.status(404).json({ error: 'Lead not found' });
        }

        if (userId) {
            const user = await User.findById(userId);
            if (!user)  res.status(404).json({ error: 'User not found' });
        }

        Customer.findByIdAndUpdate(req.params.id,req.body,{new:true})
            .then((customer) => {
                if (!customer)  res.status(404).json({ error: 'Customer not found' });
                res.status(200).json(customer);
            })
            .catch((error) => res.status(400).json({ error: error.message }));
    },

    async deleteCustomer(req: Request, res: Response) {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer)  res.status(404).json({ error: 'Customer not found' });
        res.status(200).json({ message: 'Customer deleted successfully' });
    },
};

