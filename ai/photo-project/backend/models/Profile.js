const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    location: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Profile', profileSchema);
