import User from '../../models/User.js';
import RSVP from '../../models/RSVP.js';
import UserEvent from '../../models/UserEvent.js';
import { authenticate } from '../../utils/gqlAuthMiddleware.js';

export const userResolvers = {
  Query: {
    me: async (_, __, { req }) => {
      const user = authenticate(req);
      return await User.findById(user.id)
        .populate('rsvps')
        .populate('hostedEvents');
    },
    
    savedEvents: async (_, __, { req }) => {
      const user = authenticate(req);

      return await RSVP.find({ user: user.id })
        .populate('userEvent'); 
    },
    
    myHostedEvents: async (_, __, { req }) => {
      const user = authenticate(req);

      return await UserEvent.find({ creator: user.id }).sort({ createdAt: -1 });
    },

    allUserEvents: async () => {
      return await UserEvent.find().populate('creator');
    }
  }
};
