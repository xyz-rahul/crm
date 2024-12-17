import { Request, Response } from 'express';
import { User, Lead, Customer } from '../models';

export const UserController = {
    async createAgent(req: Request, res: Response) {
        const { name, email, managerId } = req.body;
        const defaultPasswordForAgent = `#Password_{name}`
        const role = 'agent'
        const user = new User({ name, email, password: defaultPasswordForAgent, role, managerId });
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    },
    // async createManager(req: Request, res: Response) {
    //     const user = new User(req.body);
    //     const savedUser = await user.save();
    //     res.status(201).json(savedUser);
    // },
    // async createUser(req: Request, res: Response) {
    //     const user = new User(req.body);
    //     const savedUser = await user.save();
    //     res.status(201).json(savedUser);
    // },

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

