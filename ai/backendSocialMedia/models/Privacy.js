const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const privacySchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    whoCanSeeMyPosts: {
        type: String,
        enum: ['Public', 'Friends', 'OnlyMe'],
        default: 'Public'
    },
    whoCanSeeMyFriends: {
        type: String,
        enum: ['Public', 'Friends', 'OnlyMe'],
        default: 'Public'
    },
    whoCanSeeMyLocation: {
        type: String,
        enum: ['Public', 'Friends', 'OnlyMe'],
        default: 'Public'
    },
    whoCanSeeMyBirthday: {
        type: String,
        enum: ['Public', 'Friends', 'OnlyMe'],
        default: 'Public'
    },
    whoCanSeeMyPhoneNumber: {
        type: String,
        enum: ['Public', 'Friends', 'OnlyMe'],
        default: 'Public'
    },
    whoCanSeeMyEmail: {
        type: String,
        enum: ['Public', 'Friends', 'OnlyMe'],
        default: 'Public'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Privacy', privacySchema);
