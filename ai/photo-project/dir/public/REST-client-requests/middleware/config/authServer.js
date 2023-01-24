const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Route to authenticate a user and generate access and refresh tokens
app.post('/authenticate', async (req, res) => {
    // check if email and password match a user in the database
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('Invalid email or password');

    // compare the plain text password with the hashed password in the database
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).send('Invalid email or password');

    // Create and send the access and refresh tokens
    const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET);

    res.send({ accessToken, refreshToken });
});

// Route to generate a new access token
app.post('/generate-new-access-token', async (req, res) => {
    // check if the provided refresh token is valid
    const { refreshToken } = req.body;
    try {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        return res.status(401).send('Invalid refresh token');
    }

    // create a new access token
    const accessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

    // send the new access token to the client
    res.send({ accessToken });
});

// Start the auth server on a different port
const PORT = process.env.AUTH_SERVER_PORT || 3001;
app.listen(PORT, () => {
    console.log(`Auth server listening on port ${PORT}`);
});





// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const User = require("../models/user");

// const router = express.Router();

// // Route to handle user registration
// router.post("/register", async (req, res) => {
//   try {
//     // Validate the incoming data
//     // You can use the validator library or create your own validation function
//     // Example:
//     if (!req.body.name || !req.body.email || !req.body.password) {
//       return res.status(400).send({ message: "All fields are required" });
//     }

//     // Check if the email is already in use
//     const existingUser = await User.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res.status(400).send({ message: "Email is already in use" });
//     }

//     // Hash the user's password before saving it to the database
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     // Create a new user
//     const user = new User({
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword,
//     });

//     // Save the user to the database
//     await user.save();

//     // Create and send the access and refresh tokens
//     const accessToken = jwt.sign(
//       { _id: user._id },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "15m" }
//     );
//     const refreshToken = jwt.sign(
//       { _id: user._id },
//       process.env.REFRESH_TOKEN_SECRET
//     );

//     res.status(201).send({ accessToken, refreshToken });
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// });

// // Route to handle user login
// router.post("/login", async (req, res) => {
//   try {
//     // Validate the incoming data
//     // You can use the validator library or create your own validation function
//     // Example:
//     if (!req.body.email || !req.body.password) {
//       return res.status(400).send({ message: "All fields are required" });
//     }

//     // Check if the email and password match a user in the database
//     const user = await User.findOne({ email: req.body.email });
//     if (!user) {
//       return res.status(401).send({ message: "Invalid email or password" });
//     }

//     // Compare the plain text password with the hashed password in the database
//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!validPassword) {
//       return res.status(401).send({ message: "Invalid email or password" });
//     }

//     // Create and send the access and refresh tokens
//     const accessToken = jwt.sign(
//       { _id: user._id },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "15m" }
//     );
//     const refreshToken = jwt.sign(
//       { _id: user._id },
//       process.env.REFRESH_TOKEN_SECRET
//     );
//     // Save the refresh token in the database
//     user.refreshToken = refreshToken;
//     await user.save();

//     // Send the tokens to the client
//     res.send({ accessToken, refreshToken });
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// // Route to generate a new access token using a valid refresh token
// app.post("/refresh-token", async (req, res) => {
//   // Get the refresh token from the request body
//   const refreshToken = req.body.refreshToken;

//   // Check if the provided refresh token is valid
//   if (!refreshToken) return res.status(400).send("Invalid refresh token");

//   try {
//     // Verify the refresh token
//     const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

//     // Check if the user with the matching id still exists
//     const user = await User.findById(decoded._id);
//     if (!user) return res.status(401).send("User not found");

//     // Check if the refresh token belongs to this user
//     if (user.refreshToken !== refreshToken)
//       return res.status(401).send("Invalid refresh token");

//     // Create and send a new access token
//     const accessToken = jwt.sign(
//       { _id: user._id },
//       process.env.ACCESS_TOKEN_SECRET,
//       { expiresIn: "15m" }
//     );
//     res.send({ accessToken });
//   } catch (error) {
//     res.status(401).send("Invalid refresh token");
//   }
// });

// // listen to the specified port
// app.listen(4000, () => {
//     console.log(`Server running on port 4000`);
//     });
    
//     // This file is responsible for handling the authentication process of the application.
//     // It has two main routes:
//     // - '/login': this route is responsible for logging in a user. It expects an email and a password in the request body.
//     // If the email and password match a user in the database, it creates and sends an access and a refresh token to the client.
//     // - '/refresh-token': this route is responsible for generating a new access token for a logged in user.
//     // It expects a refresh token in the request body. If the refresh token is valid, it creates and sends a new access token to the client.
//     // Additionally, it also listens to a port and starts the server.
    
//     }
    
//     module.exports = authServer;
    
//     //so we use the authServer.js for the token handling, also with the routes for login and generating new access token with a valid refresh token.
//     //Also it verifies the tokens and check if the user still exists in the database and if the refresh token belongs to the user.
//     //In the routes, '/login' creates and sends both access and refresh token, while '/refresh-token' only creates and sends new access token.
//     //And it listens to port 4000 and starts the server.


 
 
 
 
 
 
 
 
 
 
 
 
 
//     // app.listen(process.env.AUTH_PORT, () => {
// //     console.log(`Auth server running on port ${process.env.AUTH_PORT}`);
// // });
