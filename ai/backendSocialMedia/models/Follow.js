const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const followSchema = new Schema({
    follower: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    followed: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Follow', followSchema);
