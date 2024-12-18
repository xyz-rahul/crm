import { Request, Response } from 'express';
import { User } from '../models';

export const UserController = {
    async createAgent(req: Request, res: Response) {
        const { name, email, managerId } = req.body;
        const defaultPasswordForAgent = `#Password_{name}`
        const role = 'agent'
        const user = new User({ name, email, password: defaultPasswordForAgent, role, managerId });
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    },

    async getAllUsers(req: Request, res: Response) {
        // const users = await User.find();
        // res.status(200).json(users);


        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const [data, err] = await User.aggregate([
            {
                $facet: {
                    users: [
                        { $sort: { createdAt: -1 } },

                        { $skip: (page - 1) * limit },
                        { $limit: limit },
                    ],
                    pageInfo: [
                        { $count: "totalCount" },
                    ],
                }
            },
            { $unwind: "$pageInfo" }
        ]);

        if (data) res.json(data);
        else throw new Error(err)

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

