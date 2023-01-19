const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    subscriber: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subscribed: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
