const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    coordinates: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

locationSchema.index({ coordinates: '2dsphere' });

module.exports = mongoose.model('Location', locationSchema);
