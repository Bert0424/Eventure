import User from '../../models/User.js';
import RSVP from '../../models/RSVP.js';
import UserEvent from '../../models/UserEvent.js';
import { authenticate } from '../../utils/gqlAuthMiddleware.js';

export const userResolvers = {
  Query: {
    // 🔍 Get current logged-in user
    me: async (_, __, { req }) => {
      const user = authenticate(req);
      return await User.findById(user.id)
        .populate('rsvps')
        .populate('hostedEvents');
    },

    // 📜 Get RSVPs (ticketmaster + user events)
    savedEvents: async (_, __, { req }) => {
      const user = authenticate(req);

      return await RSVP.find({ user: user.id })
        .populate('userEvent'); // Only user-created events have details here
    },

    // 🗓️ Hosted events
    myHostedEvents: async (_, __, { req }) => {
      const user = authenticate(req);

      return await UserEvent.find({ creator: user.id }).sort({ createdAt: -1 });
    },

    // 🌍 (Optional) See all user-created events on the platform
    allUserEvents: async () => {
      return await UserEvent.find().populate('creator');
    }
  }
};
