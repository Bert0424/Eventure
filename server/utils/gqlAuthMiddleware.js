import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

export const authenticate = (req) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('No token provided');

  try {
    const decoded = jwt.verify(token, secret);
    return decoded; // contains { id, email }
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};
