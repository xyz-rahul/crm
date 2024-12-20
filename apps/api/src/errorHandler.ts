import mongoose from 'mongoose'
import mongodb = require('mongodb');
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken';

export default function(error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    console.log('error', error)
    if (error instanceof mongodb.MongoServerError) {
        res.status(400).json({ name: error.name, message: error.errmsg });
    }

    if (error instanceof mongoose.Error.ValidationError) {
        console.log('Instance of ValidationError');
        res.status(400).json({ name: error.name, message: error.message });
    }

    if (error instanceof mongoose.Error.CastError) {
        console.log('Instance of CastError');
        res.status(400).json({
            name: error.name,
            message: `Invalid ${error.path}: ${error.value}.`,
        });
    }

    if (error instanceof mongoose.Error.DocumentNotFoundError) {
        console.log('Instance of DocumentNotFoundError');
        res.status(404).json({ name: error.name, message: 'Document not found.' });
    }

    if (error instanceof mongoose.Error.VersionError) {
        console.log('Instance of VersionError');
        res.status(409).json({
            name: error.name,
            message: 'Version conflict detected during a document update.',
        });
    }

    if (error instanceof mongoose.Error) {
        console.log('Generic Mongoose Error');
        res.status(500).json({ name: error.name, message: error.message });
    }
    if (error instanceof JsonWebTokenError) {
        res.status(400).json({ name: error.name, message: error.message });
    }


    console.error('Unhandled error:', error);
    res.status(500).json();
}
