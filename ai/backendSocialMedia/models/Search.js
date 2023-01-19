const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    searchTerm: {
        type: String,
        required: true
    },
    searchType: {
        type: String,
        enum: ['Users', 'Posts', 'Groups', 'Pages'],
        required: true
    },
    results: [
        {
            type: mongoose.Types.ObjectId
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Search', searchSchema);
