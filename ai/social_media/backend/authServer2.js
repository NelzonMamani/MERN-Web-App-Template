const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoose = require('mongoose');
const config = require('../config/config');
const User = require('../models/user');
const RefreshToken = require('../models/refreshToken');
const { check, validationResult } = require('express-validator');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const nodemailer = require('nodemailer');

const app = express();

// Enable CORS
app.use(cors());

// Enable rate limiting
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per window
  message: 'Too many login attempts, please try again later.'
});
const passwordResetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 password reset attempts per window
  message: 'Too many password reset attempts, please try again later.'
});

// Enable helmet for security headers
app.use(helmet());

// Enable body parser for JSON parsing
app.use(bodyParser.json());

// Enable cookie parser for session management
app.use(cookieParser());

// Enable CSRF protection
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Connect to MongoDB
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

// Generate and sign access token
const generateAccessToken = (user) => {
  return jwt.sign({ _id: user._id }, config.accessTokenSecret, { expiresIn: config.jwtExpire });
}

// Generate and sign refresh token
const generateRefreshToken = (user) => {
  return jwt.sign({ _id: user._id }, config.refreshTokenSecret);
}

// Store refresh token in the database
const storeRefreshToken = (token, user) => {
  const refreshToken = new RefreshToken({ token, user });
  return refreshToken.save();
}

// // Register new user
// app.post('/register', [
//   check('email').isEmail().withMessage('Invalid email address'),
//   check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
// ], csrfProtection, async (req, res) => {
//   try {
//     // Validate request
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(


// Register new user
app.post("/register", (req, res) => {
    // Validate request body
    const { error } = validateRegistration(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if user already exists
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send("Error checking if user already exists.");
        if (user) return res.status(400).send("User already exists.");

        // Hash password
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) return res.status(500).send("Error hashing password.");

            // Create new user
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            newUser.save((err, user) => {
                if (err) return res.status(500).send("Error saving new user.");

                // Generate and sign access token
                const accessToken = jwt.sign({ _id: user._id }, config.accessTokenSecret, { expiresIn: config.jwtExpire });

                // Generate and save refresh token
                const refreshToken = jwt.sign({ _id: user._id }, config.refreshTokenSecret);
                user.refreshTokens.push(refreshToken);
                user.save((err) => {
                    if (err) return res.status(500).send("Error saving refresh token.");

                    // Send response
                    res.json({
                        accessToken,
                        refreshToken
                    });
                });
            });
        });
    });
});





