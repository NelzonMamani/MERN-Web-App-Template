const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    reporter: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reportedItem: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Report', reportSchema);
