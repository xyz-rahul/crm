import express from "express";
import cors from "cors";
import errorHandler from "../errorHandler";
import routes from '../routes'
import session from 'express-session'
import mongoose from 'mongoose'
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";

declare module 'express-session' {
    interface SessionData {
        user: {
            email: string,
            role: string
        };
    }
}

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) throw new Error('SESSION_SECRET not provided');

export default function createServer(): express.Express {
    const app = express();
    app
        .disable("x-powered-by")
        .use(express.urlencoded({ extended: false }))
        .use(express.json())
        .use(cookieParser())
        .use(cors())
        .use(session({
            secret: SESSION_SECRET!,
            resave: true,
            saveUninitialized: false,
            cookie: { maxAge: 24 * 60 * 60 * 1000 },
            store: MongoStore.create({
                client: mongoose.connection.getClient(),
                dbName: 'myapp',
                collectionName: "sessions",
                stringify: false,
                autoRemove: "interval",
                autoRemoveInterval: 1
            })
        }))
        .get('/api/status', (req, res) => {
            res.json({ status: 'OK' });
        })
        .use('/api', routes)
        .use(errorHandler)

    return app;
};

