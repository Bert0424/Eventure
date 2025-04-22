import mongoose from "mongoose";

const rsvpSchema = new mongoose.Schema({
    ticketmasterId: { type: String, default: null, unique: true },

    userEvent: { type: mongoose.Schema.Types.ObjectId, ref: 'UserEvent', default: null },
   
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    }, { timestamps: true });

const RSVP = mongoose.models.RSVP || mongoose.model('RSVP', rsvpSchema);
export default RSVP;