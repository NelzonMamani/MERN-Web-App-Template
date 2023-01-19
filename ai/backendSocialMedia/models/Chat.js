const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    conversation: {
        type: mongoose.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Chat', chatSchema);
