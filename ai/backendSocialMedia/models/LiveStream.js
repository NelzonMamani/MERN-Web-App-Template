const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const liveStreamSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    liveStreamURL: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('LiveStream', liveStreamSchema);
