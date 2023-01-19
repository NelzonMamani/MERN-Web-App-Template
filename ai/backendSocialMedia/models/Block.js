const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blockSchema = new Schema({
    blocker: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blocked: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Block', blockSchema);
