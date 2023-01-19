const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    options: [{
        text: {
            type: String,
            required: true
        },
        votes: {
            type: Number,
            default: 0
        }
    }],
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    voters: [
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

module.exports = mongoose.model('Poll', pollSchema);
