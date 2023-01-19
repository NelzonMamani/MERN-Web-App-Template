const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    location: {
        type: mongoose.Types.ObjectId,
        ref: 'Location',
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    attendees: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', eventSchema);
