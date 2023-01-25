// it also works
// it also works
// it also works
// it also works
// it also works
// it also works
// it also works

const User = require('../models/User');

// Function to validate user data before creating a new user
const validateUserData = async (req, res, next) => {
    // Destructure email and password from the request body
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email is already in use' });
    }

    // If all checks pass, call the next middleware function
    next();
};

// Function to validate post data before creating a new post
const validatePostData = (req, res, next) => {
    // Destructure title and content from the request body
    const { title, content } = req.body;

    // Check if title and content are provided
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }

    // If all checks pass, call the next middleware function
    next();
};

// Function to validate comment data before creating a new comment
const validateCommentData = (req, res, next) => {
    // Destructure text from the request body
    const { text } = req.body;

    // Check if text is provided
    if (!text) {
        return res.status(400).json({ message: 'Comment text is required' });
    }

    // If all checks pass, call the next middleware function
    next();
};

module.exports = {
    validateUserData,
    validatePostData,
    validateCommentData
};
