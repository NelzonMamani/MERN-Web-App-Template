require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const directoryStructure = require('./directory_structureXYZ.json');
//const directoryStructure = require('./structureXYZ.json');
 
const app = express();
app.use(express.json());


// ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET are stored in a .env file
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

app.post("/login", (req, res) => {
    // Authenticate user and create an access token
    const accessToken = jwt.sign({ userId: req.body.userId }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    // Create a refresh token
    const refreshToken = jwt.sign({ userId: req.body.userId }, REFRESH_TOKEN_SECRET);
    // Send the tokens to the client
    res.json({ accessToken, refreshToken, directoryStructure });
});

app.post("/refresh-token", (req, res) => {
    // Verify the refresh token
    const { userId } = jwt.verify(req.body.refreshToken, REFRESH_TOKEN_SECRET);
    // Create a new access token
    const accessToken = jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    // Send the new access token to the client
    res.json({ accessToken });
});


// Connect to MongoDB Atlas
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected successfully");

    // Start the Express server
    const PORT = process.env.PORT || 4001;
    app.listen(PORT, () => {
      console.log(`Backend web server listening for request on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
