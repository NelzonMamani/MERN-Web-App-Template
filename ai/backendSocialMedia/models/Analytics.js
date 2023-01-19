const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const analyticsSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pageViews: {
        type: Number,
        default: 0
    },
    uniqueVisitors: {
        type: Number,
        default: 0
    },
    averageVisitDuration: {
        type: Number,
        default: 0
    },
    bounceRate: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Analytics', analyticsSchema);
