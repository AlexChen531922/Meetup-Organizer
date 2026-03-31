const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    hostId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // origin userId
    title: { type: String, required: true },
    summary: { type: String },
    details: { type: String },
    date: { type: String }, // simple
    time: { type: String },
    location: { type: String },
    category: { type: String }, // e.g., Outdoor, Tech
    attendeeLimit: { type: Number, default: 0 }, //no limit
    attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // UserStory 3 attendee list
    image: { type: String } // for image upload
});

module.exports = mongoose.model('Event', eventSchema);
