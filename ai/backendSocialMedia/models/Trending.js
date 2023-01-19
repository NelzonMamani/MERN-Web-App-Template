const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trendingSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'Post',
    },
    count: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Trending', trendingSchema);
