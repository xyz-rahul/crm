import express from 'express'
import { Lead, User } from "../models";

export async function search(req: express.Request, res: express.Response) {
    const leadResult = Lead.aggregate([
        {
            $match: {
                $or: [
                    { name: { $regex: req.params.key, $options: 'i' } } // Using $options: 'i' for case-insensitivity
                ]
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                email: 1,
                type: { $literal: "user" }
            }
        }
    ]);

    const userResult = User.aggregate([
        {
            $match: {
                $or: [
                    { name: { $regex: req.params.key, $options: 'i' } } // Using $options: 'i' for case-insensitivity
                ]
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                email: 1,
                type: { $literal: "lead" }
            }
        }
    ]);
    const result = await Promise.all([leadResult, userResult])
    res.json(result.flat())
}
