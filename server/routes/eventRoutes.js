import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
dotenv.config();
const router = express.Router();

// Event routes
router.post('/', createEvent); // Create a new event
router.get('/', getAllEvents); // Get all events

// Eventbrite API route
router.get('/search', async (req, res) => {
    try {
      const { location, keyword } = req.query;
  
      const response = await axios.get('https://www.eventbriteapi.com/v3/events/search/', {
        headers: {
          Authorization: `Bearer ${process.env.EVENTBRITE_TOKEN}`
        },
        params: {
          'location.address': location || 'Minneapolis',
          'q': keyword || '',
          'expand': 'venue',
        }
      });
  
      res.json(response.data);
    } catch (err) {
      console.error('Eventbrite error:', err.response?.data || err.message);
      res.status(500).json({ error: 'Failed to fetch from Eventbrite' });
    }
  });

  router.get('/eventbrite/:id', async (req, res) => {
  try {
    const response = await axios.get(`https://www.eventbriteapi.com/v3/events/${req.params.id}/`, {
      headers: {
        Authorization: `Bearer ${process.env.EVENTBRITE_TOKEN}`
      },
      params: {
        expand: 'venue,category,logo',
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('Eventbrite ID error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch Eventbrite event by ID' });
  }
});




// Event routes, protected by JWT
router.get('/:id', verifyToken, getEventById); // Get a single event by ID
router.put('/:id', verifyToken, updateEvent); // Update an event by ID
router.delete('/:id', verifyToken, deleteEvent); // Delete an event by ID

  
export default router;