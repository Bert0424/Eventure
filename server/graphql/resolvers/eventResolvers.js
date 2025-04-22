import User from '../../models/User.js';
import RSVP from '../../models/RSVP.js';
import UserEvent from '../../models/UserEvent.js';
import { authenticate } from '../../utils/gqlAuthMiddleware.js';

export const resolvers = {
    Query: {
        me: async (_, __, { req }) => {
            const user = authenticate(req);
            return await User.findById(user.id)
            .populate('rsvps').
            populate('hostedEvents');
        },
        
        savedEvents: async (_, __, { req }) => {
            const user = authenticate(req);
            return await RSVP.find({ user: user.id })
            .populate('userEvent');
        },
        
        myHostedEvents: async (_, __, { req }) => {
            const user = authenticate(req);
      
            return await UserEvent.find({ creator: user.id })
            .sort({ createdAt: -1 });
          },
         
         allUserEvents: async () => {
            return await UserEvent.find().populate('creator');
        }
    },

    Mutation: {
        createUserEvent: async (_, args, { req }) => {
            const user = authenticate(req);
            const newEvent = await UserEvent.create({ ...args, creator: user.id });
            await User.findByIdAndUpdate(user.id, { $push: { hostedEvents: newEvent._id } });
            return newEvent;
        },
        
        updateUserEvent: async (_, {id, ...update}, { req }) => {
            const user = authenticate(req);
            const event = await UserEvent.findOne({ _id: id, creator: user.id });
            if (!event) throw new Error('Event not found');
            Object.assign(event, update);
            await event.save();

            return event;
        },
        deleteUserEvent: async (_, id, { req }) => {
            const user = authenticate(req);
            const event = await UserEvent.findOne({ _id: id, creator: user.id });
            if (!event) throw new Error('Event not found');
            await User.findByIdAndUpdate(user.id, { $pull: { hostedEvents: id } });
            return true;
        }
    }
};


