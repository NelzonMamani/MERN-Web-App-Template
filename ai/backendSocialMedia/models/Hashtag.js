const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hashtagSchema = new Schema({
    text: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    posts: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Post'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Hashtag', hashtagSchema);
