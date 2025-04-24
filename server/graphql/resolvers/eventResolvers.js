import User from '../../models/User.js';
import RSVP from '../../models/RSVP.js';
import UserEvent from '../../models/UserEvent.js';
import axios from 'axios';
//import { createEvent } from '../../controllers/eventController.js';

export const eventResolvers = {
    Query: {
        me: async (_, __, { user }) => {
            if (!user) throw new Error("Not authenticated");
            return await User.findById(user.id).populate('rsvps').populate('hostedEvents');
          },
          
          events: async (_, { keyword = "", city = "" }) => {
            try {
              const res = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
                params: {
                  apikey: process.env.TICKETMASTER_API_KEY,
                  keyword,
                  city,
                  size: 10
                }
              });
      
              const rawEvents = res.data._embedded?.events || [];
      
              return rawEvents.map((event) => ({
                ticketmasterId: event.id,
                name: event.name,
                date: event.dates?.start?.localDate || "",
                time: event.dates?.start?.localTime || "",
                description: event.info || "No description available.",
                image: event.images?.[0]?.url || "",
                category: event.classifications?.[0]?.segment?.name || "General",
                venue: event._embedded?.venues?.[0]?.name || "Unknown venue",
                city: event._embedded?.venues?.[0]?.city?.name || "Unknown city",
                url: event.url || ""
              }));
            } catch (err) {
              console.error("Ticketmaster API Error:", err.message);
              return [];
            }
          },
          event: async (_, { ticketmasterId }) => {
            try {
              const res = await axios.get(`https://app.ticketmaster.com/discovery/v2/events/${ticketmasterId}.json`, {
                params: {
                  apikey: process.env.TICKETMASTER_API_KEY,
                },
              });
          
              const e = res.data;
          
              return {
                ticketmasterId: e.id,
                name: e.name,
                date: e.dates?.start?.localDate || "",
                time: e.dates?.start?.localTime || "",
                description: e.info || "No description available.",
                image: e.images?.[0]?.url || "",
                category: e.classifications?.[0]?.segment?.name || "General",
                venue: e._embedded?.venues?.[0]?.name || "Unknown venue",
                city: e._embedded?.venues?.[0]?.city?.name || "Unknown city",
                url: e.url || ""
              };
            } catch (err) {
              console.error("Error fetching single event:", err.message);
              return null;
            }
          },
        savedEvents: async (_, __, { user }) => {
            if (!user) throw new Error("Not authenticated");
            return await RSVP.find({ user: user.id }).populate('userEvent');
          },
          
        
          myHostedEvents: async (_, __, { user }) => {
            if (!user) throw new Error("Not authenticated");
            return await UserEvent.find({ creator: user.id }).sort({ createdAt: -1 });
          },
         
         allUserEvents: async () => {
            return await UserEvent.find().populate('creator');
        }
    },

    Mutation: {
        createEvent: async (_, { input }, { user }) => {
            try {
                console.log("CREATING EVENT", input, user);
              const event = await TicketmasterEvent.create({
                ...input,
                creator: user.id, 
              });
              return event;
            } catch (error) {
              throw new Error("Failed to create event");
            }
          },
        
        updateUserEvent: async (_, { id, ...update }, { user }) => {
            if (!user) throw new Error("Not authenticated");
            const event = await UserEvent.findOne({ _id: id, creator: user.id });
            if (!event) throw new Error('Event not found');
            Object.assign(event, update);
            await event.save();
            return event;
          },
          deleteUserEvent: async (_, { id }, { user }) => {
            if (!user) throw new Error("Not authenticated");
            const event = await UserEvent.findOne({ _id: id, creator: user.id });
            if (!event) throw new Error('Event not found');
            await User.findByIdAndUpdate(user.id, { $pull: { hostedEvents: id } });
            return true;
          }
        }
};

