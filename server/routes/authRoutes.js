import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
//Implement auth routes
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', verifyToken, getUserProfile);
export default router;