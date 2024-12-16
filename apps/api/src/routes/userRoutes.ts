import express, { Router } from "express";
import bcrypt from 'bcrypt'
import { User } from "../models.js";
import mongoose from 'mongoose'

const router = express.Router() as Router;

const saltRounds = 10;

router.post('/', async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'Name, email, password, and role are required.' });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hash, role });
    const savedUser = await user.save();

    res.status(201).json({ user: savedUser });
})

router.post("/", async (req, res) => {
    const { name, email, password, role } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: "User created successfully", user });
});

router.get("/", async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// Get a user by ID
router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
});

// Update a user
router.put("/:id", async (req, res) => {
    const { name, email, role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { name, email, role },
        { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json(updatedUser);
});

router.delete("/:id", async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
});

export default router;
