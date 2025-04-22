import User from '../../models/User.js';
import { generateToken } from '../../utils/generateToken.js';

export const authResolvers = {
    Mutation: {
        register: async (_, { username, email, password }) => {
            const existingUser = await User.findOne({ email });
            if (existingUser) throw new Error('User already exists');

            const newUser = await User.create({ username, email, password });
            const token = generateToken(newUser);
            return { user: newUser, token };
        },
        login: async (_, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) throw new Error('Invalid credentials');

            const isMatch = await user.comparePassword(password);
            if (!isMatch) throw new Error('Invalid credentials');

            const token = generateToken(user);
            return { user, token };
        }
    }
};