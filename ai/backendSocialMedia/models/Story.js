const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    media: {
        type: [mongoose.Types.ObjectId],
        ref: 'Media',
        required: true
    },
    caption: {
        type: String,
    },
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Story', storySchema);
