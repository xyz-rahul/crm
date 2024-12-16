import express from "express";
import cors from "cors";
import userRoutes from '../routes/userRoutes'
import errorHandler from "../errorHandler";


export default function createServer(): express.Express {
    const app = express();
    app
        .disable("x-powered-by")
        .use(express.urlencoded({ extended: true }))
        .use(express.json())
        .use(cors())
        .get('/status', (_, res) => {
            res.json({ status: 'OK' });
        })
        .use('/user', userRoutes)
        .use(errorHandler)

    return app;
};

