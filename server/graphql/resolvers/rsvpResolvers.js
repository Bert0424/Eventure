import RSVP from "../../models/RSVP.js";
import User from "../../models/User.js";
import { authenticate } from "../../utils/gqlAuthMiddleware.js";

export const rsvpResolvers = {
    Mutation: {
        rsvpToTicketmasterEvent: async (_, { ticketmasterId }, { req }) => {
            const user = authenticate(req);
            const exists = await RSVP.findOne({ ticketmasterId, user: user.id });
            if (exists) return exists;
            const newRsvp = await RSVP.create({ ticketmasterId, user: user.id });
            return newRsvp;
        },
       
        cancelRsvp: async (_, { ticketmasterId }, { req }) => {
            const user = authenticate(req);
      
            const rsvp = await RSVP.findOneAndDelete({ user: user.id, ticketmasterId });
            if (rsvp) {
              await User.findByIdAndUpdate(user.id, { $pull: { rsvps: rsvp._id } });
              return true;
            }
            return false;
          },
        rsvpUserEvent: async (_, { userEventId }, { req }) => {
                const user = authenticate(req);
                const exists = await RSVP.findOne({ userEvent: userEventId, user: user.id });
                if (exists) return exists;
                const newRsvp = await RSVP.create({ userEvent: userEventId, user: user.id });
                await User.findByIdAndUpdate(user.id, { $push: { rsvps: newRsvp._id } });
                const populatedRSVP = await RSVP.findById(newRsvp._id).populate('userEvent');
                  
                return populatedRSVP;
            },
            cancelUserEventRsvp: async (_, { userEventId }, { req }) => {
                const user = authenticate(req);
          
                const rsvp = await RSVP.findOneAndDelete({ user: user.id, userEvent: userEventId });
                if (rsvp) {
                  await User.findByIdAndUpdate(user.id, { $pull: { rsvps: rsvp._id } });
                  return true;
                }
                return false;
              }
    }
}