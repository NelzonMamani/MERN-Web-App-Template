const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    images: [
        {
            type: String
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Album', albumSchema);
