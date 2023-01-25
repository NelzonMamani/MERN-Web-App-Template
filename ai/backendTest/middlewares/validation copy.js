// this WORKS
// this WORKS


const User = require('../models/User');
const mongoose = require('mongoose');

const validateUserData = async (req, res, next) => {
    // check if email and password fields are present
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'Please enter a valid email and password'
        });
    }

    // check if email is unique
    const emailExists = await mongoose.models.User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).json({
            message: 'Email already exists'
        });
    }

    next();
};

module.exports = {
    validateUserData
}

// exports.validatePost = (req, res, next) => {
//   const { title, content } = req.body;
//   if (!title || !content) {
//     return res.status(400).json({
//         error: "Title and content are required"
//     });
//   }
//   next();
// };

// exports.validateComment = (req, res, next) => {
//   const { text } = req.body;
//   if (!text) {
//     return res.status(400).json({
//         error: "Comment text is required"
//     });
//   }
//   next();
// };
