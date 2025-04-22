import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        const token = generateToken(newUser);
        res.status(201).json({ user: { id: newUser._id, email: newUser.email }, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
}
// Login a user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Generate JWT token
        const token = generateToken(user);
        res.status(200).json({ user: { id: user._id, email: user.email }, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login failed' });
    }
}
