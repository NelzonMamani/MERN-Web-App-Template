const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adSchema = new Schema({
    advertiser: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    adTitle: {
        type: String,
        required: true
    },
    adDescription: {
        type: String,
        required: true
    },
    adTarget: {
        type: String,
        enum: ['All', 'Age', 'Gender', 'Interests'],
        required: true
    },
    adStartDate: {
        type: Date,
        required: true
    },
    adEndDate: {
        type: Date,
        required: true
    },
    adBudget: {
        type: Number,
        required: true
    },
    adURL: {
        type: String,
        required: true
    },
    adImpressions: {
        type: Number,
        default: 0
    },
    adClicks: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Ad', adSchema);
