const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [
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

module.exports = mongoose.model('Group', groupSchema);
