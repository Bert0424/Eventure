import mongoose from "mongoose";

const userEventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    date: String,
    time: String,
    mood: String,
    location: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const UserEvent = mongoose.models.UserEvent || mongoose.model('UserEvent', userEventSchema);
export default UserEvent;

