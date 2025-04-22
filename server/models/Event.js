import mongoose from 'mongoose';

  
const eventSchema = new mongoose.Schema({
  ticketmasterId: { type: String, required: true, unique: true },
  name: String,
  date: String,
  time: String,
  description: String,
  image: String,
  category: String,
  venue: String,
  city: String,
  url: String
}, { timestamps: true });


const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
export default Event;
