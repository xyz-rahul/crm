import { Request, Response } from 'express';
import { Lead, User } from '../models';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

export const LeadController = {
    async createLead(req: Request, res: Response) {
        const { name, email, phone, status, userId } = req.body; // userId is the reference to User

        const user = await User.findById(userId);
        if (!user) res.status(404).json({ error: 'User not found' });

        const lead = new Lead(req.body);
        lead.save()
            .then((newLead) => res.status(201).json(newLead))
            .catch((error) => res.status(400).json({ error: error.message }));
    },

    async getAllLeads(req: Request, res: Response) {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const [data, err] = await Lead.aggregate([
            {
                $facet: {
                    leads: [
                        { $sort: { createdAt: -1 } },

                        { $skip: (page - 1) * limit },
                        { $limit: limit },

                        {
                            $lookup: {
                                from: User.collection.name,
                                localField: "userId",
                                foreignField: "_id",
                                as: "user",
                                pipeline: [
                                    { $project: { _id: 1, name: 1, role: 1 } }
                                ]
                            }
                        },
                        { $unwind: "$user" }
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

    async getLeadById(req: Request, res: Response) {
        const [data, err] = await Lead.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.params.id)
                }
            },
            {
                $lookup: {
                    from: User.collection.name,
                    localField: "userId",
                    foreignField: "_id",
                    as: "user",
                    pipeline: [
                        { $project: { _id: 1, name: 1, role: 1 } }
                    ]
                }
            },
            { $unwind: "$user" }
        ]);


        if (data) res.json(data)
        else throw new Error(err)
    },

    updateLead(req: Request, res: Response) {
        console.log('update lead req', req.body)
        Lead.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((lead) => {
                if (!lead) return res.status(404).json({ error: 'Lead not found' });
                console.log('200', lead)
                res.status(200).json(lead);
            })
            .catch((error) => res.status(400).json({ error: error.message }));
    },

    // Delete a lead
    deleteLead(req: Request, res: Response) {
        Lead.findByIdAndDelete(req.params.id)
            .then((lead) => {
                if (!lead) return res.status(404).json({ error: 'Lead not found' });
                res.status(200).json({ message: 'Lead deleted successfully' });
            })
            .catch((error) => res.status(500).json({ error: error.message }));
    },
    async getReport(req: Request, res: Response) {

        const now = new Date();

        // Calculate date ranges
        const startOfYear = new Date(now.getFullYear(), 0, 1); // Jan 1st of this year
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1); // 1st day of this month
        const startOfWeek = new Date(now); // Start of this week
        startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday of this week

        const [data, err] = await Lead.aggregate([
            {
                $facet: {
                    thisYear: [
                        { $match: { createdAt: { $gte: startOfYear }, }, },
                        { $count: "count", },
                    ],
                    thisMonth: [
                        { $match: { createdAt: { $gte: startOfMonth }, }, },
                        { $count: "count", },
                    ],
                    thisWeek: [
                        { $match: { createdAt: { $gte: startOfWeek }, }, },
                        { $count: "count", },
                    ],
                },
            },

            { $unwind: "$thisYear" },
            { $unwind: "$thisMonth" },
            { $unwind: "$thisWeek" },
        ]);

        if (data) res.json(data)
        else throw new Error(err)
    }
};

