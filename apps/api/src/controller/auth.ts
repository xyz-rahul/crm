import { Request, Response } from 'express';
import { User, Lead, Customer } from '../models';
import bcrypt from 'bcrypt';

export const AuthController = {
    async signUpAsManager(req: Request, res: Response) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: 'Name, email, and password are required.' });
        }

        const user = await User.findOne({ "email": { "$exists": true } })
        if (!user) res.status(400).json({ message: "user with name already exists" });

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const managerUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await managerUser.save();
        res.status(201).json(savedUser);
    },

    async login(req: Request, res: Response) {
        console.log(req.session.user)
        const { email, password } = req.body;
        const user = await User.findOne({
            "email": { "email": { "$eq": email } },
            "password": { "password": { "$eq": password } }
        })

        //TODO
        req.session.user = {
            email: user?.email!,
            role: user?.role!
        }

        res.json({ message: 'ok' });

    }
};



