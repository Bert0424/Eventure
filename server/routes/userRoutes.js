import express from 'express';
import { getUserProfile } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();
// TODO: Implement user routes

router.get('/me', verifyToken, getUserProfile);

export default router;