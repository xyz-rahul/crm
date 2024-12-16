import express from "express";
import cors from "cors";
import errorHandler from "../errorHandler";
import routes from '../routes'


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
        .use(routes)
        .use(errorHandler)

    return app;
};

