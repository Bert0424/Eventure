import Event from "../models/Event.js";
//import { parseEventbriteEvent } from "../utils/parseEventbriteEvent.js";

// Function to create a new event
export const createEvent = async (req, res) => {
    try {
        // 
        const eventData = {
        ...req.body,
        hostUserId : req.user.id
    };
        const newEvent = await Event.create(eventData);
        res.status(201).json(newEvent);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating event' });
    }
}

// Function to get all events
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching events' }); 
    }
}
// Function to get a single event by ID
export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching event' });
    }
}
// Function to update an event
export const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (event.hostUser.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not allowed to modify this event.' });
          }
        res.status(200).json(event);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating event' });
    }
}
// Function to delete an event
export const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (event.hostUser.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not allowed to modify this event.' });
          }
        res.status(200).json({ message: 'Event deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting event' }); 
    }
}