const User = require('../models/User');

// Function to validate user data before creating a new user
const validateUserData = async (req, res, next) => {
    try {
        // Check if the email is already in use
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        // Check if all required fields are provided
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Check if the email is in a valid format
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRegex.test(req.body.email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Check if the password is at least 8 characters long
        if (req.body.password.length < 8) {
            return res.status(400).json({ error: "Password must be at least 8 characters long" });
        }

        // If all validation checks pass, move on to the next middleware/controller
        next();
    } catch (error) {
        res.status(500).json({ error });
    }
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
