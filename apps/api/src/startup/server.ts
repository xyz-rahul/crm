import express from "express";
import cors from "cors";


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

    return app;
};

