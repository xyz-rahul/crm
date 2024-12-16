import { Request, Response } from 'express';
import { User, Lead, Customer } from '../models';

export const UserController = {
    async createUser(req: Request, res: Response) {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    },

    async getAllUsers(req: Request, res: Response) {
        const users = await User.find();
        res.status(200).json(users);
    },

    async getUserById(req: Request, res: Response) {
        const user = await User.findById(req.params.id);
        if (!user) res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    },

    async updateUser(req: Request, res: Response) {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    },

    async deleteUser(req: Request, res: Response) {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    },
};

