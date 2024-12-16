import { Request, Response } from 'express';
import { Lead, User } from '../models';

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

    getAllLeads(req: Request, res: Response) {
        Lead.find()
            .populate('userId', 'name email')
            .then((leads) => res.status(200).json(leads))
            .catch((error) => res.status(500).json({ error: error.message }));
    },

    getLeadById(req: Request, res: Response) {
        Lead.findById(req.params.id)
            .populate('userId', 'name email')
            .then((lead) => {
                if (!lead) return res.status(404).json({ error: 'Lead not found' });
                res.status(200).json(lead);
            })
            .catch((error) => res.status(500).json({ error: error.message }));
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
};

