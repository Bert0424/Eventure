import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    description : String,
    
    // Dates 
    startDate : {
        type: Date,
        required: true,
    },
    endDate : Date,
    // Category from Eventbrite API
    catergoryId : String,
    // URL 
    Eventurl : String,
    // Location from expanded venue data 
  location : {
        name: String,
        address: {
            city: String,
            region: String,
            country: String,
            latitude: String,
            longitude: String,
        },
    // Expanded organizer data
    organizer : {
        name: String,
        description: String,
        url: String,
    },
    // RSVP data
    RSVPs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

    // Owner (if created by a user from the app)
    hostUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    // If the event came from Eventbrite API
    externalSource: {
        type: String,
        enum: ['eventbrite', 'null'],
        default: 'null',
    },

    externalId: String
}});

const Event = mongoose.model('Event', eventSchema);
export default Event;