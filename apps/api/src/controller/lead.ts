import { Request, Response } from 'express';
import { Lead, User } from '../models';

export const LeadController = {
    async createLead(req: Request, res: Response) {
        console.log('create lead')
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
        const [data, err] = await Lead.aggregate([{
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
        Lead.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((lead) => {
                if (!lead) return res.status(404).json({ error: 'Lead not found' });
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

    async getMonthlyReport(req: Request, res: Response) {
        var currentMonth = new Date().getMonth() + 1;

        const [data, err] = await Lead.aggregate([
            {
                $match: {
                    $expr: {
                        $eq: [{ $date: "$createdAt" }, currentMonth]
                    }
                }
            },
            {
                $group: {
                    _id: { $dayOfMonth: "$date" },
                    // totalSales: { $sum: "$amount" }
                }
            },
            {
                $sort: { "_id": 1 }
            }
        ])
        res.json(data)

    }
};

