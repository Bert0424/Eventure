import express from 'express';
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();


// Event routes
router.post('/', createEvent); // Create a new event
router.get('/', getAllEvents); // Get all events

// Event routes, protected by JWT
router.get('/:id', verifyToken, getEventById); // Get a single event by ID
router.put('/:id', verifyToken, updateEvent); // Update an event by ID
router.delete('/:id', verifyToken, deleteEvent); // Delete an event by ID

export default router;