const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
