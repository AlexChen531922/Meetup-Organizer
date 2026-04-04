// backend/models/Group.js
const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,

    },
    imageUrl: {
        type: String,
        required: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

// members count
groupSchema.virtual('memberCount').get(function () {
    return this.members.length;
});

groupSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Group', groupSchema);