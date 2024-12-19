import { Request, Response } from 'express';
import { User } from '../models';
import bcrypt from 'bcrypt';

export const AuthController = {
    async signUpAsManager(req: Request, res: Response) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: 'Name, email, and password are required.' });
        }

        const user = await User.findOne({ "email": email })
        if (user) res.status(400).json({ message: "user with name already exists" });

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
        const { email, password } = req.body;
        const user = await User.findOne({
            "email": email,
        })

        if (
            !user ||
            ! await bcrypt.compare(password, user.password)
        ) {
            res.status(404).json({ message: "Wrong credential" });
        } else {
            const compare = await bcrypt.compare(password, user.password);
            if (!compare) {
                res.status(404).json({ message: "Wrong credential" });
            }

            req.session.user = {
                email: user.email,
                role: user.role
            }

            res.json(user);
        }
    },
    async isLoggedIn(req: Request, res: Response) {
        const email = req.session.user?.email!;
        const user = await User.findOne({
            "email": email,
        })

        res.json(user);
    },

    async logout(req: Request, res: Response) {

        res.header('Cache-Control', 'no-cache')
        req.session.destroy(function(err) {
            console.log('session destory error: ', err)
        });
        res.send();
    },
};


