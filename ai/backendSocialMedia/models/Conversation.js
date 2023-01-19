const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    participants: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    messages: [{
        type: mongoose.Types.ObjectId,
        ref: 'Chat',
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Conversation', conversationSchema);
