const express = require("express");
const jwt = require("jsonwebtoken");
const { validateUserData } = require("./middlewares/validation");
const User = require("./models/User");
const mongoose = require("mongoose");

require("dotenv").config();

// Create a new instance of Express
const app = express();

// Use the json middleware provided by Express to parse incoming json data
app.use(express.json());

// Route to handle user registration
app.post('/register', validateUserData, async (req, res) => {
  const { email, password } = req.body;
  try {
    // Create a new user
    const user = new User({ email, password });
    await user.save();

    // Generate access and refresh tokens
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRE });

    // Return access and refresh tokens to the client
    res.status(201).json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// // Route to handle user registration
// app.post("/register", validateUserData, async (req, res) => {
//   // Hash the password
//   req.body.password = await bcrypt.hash(req.body.password, 10);

//   // Create the user
//   const user = new User(req.body);
//   await user.save();

//   // Generate access and refresh tokens
//   const accessToken = jwt.sign(
//     { userId: user._id },
//     process.env.ACCESS_TOKEN_SECRET,
//     { expiresIn: process.env.JWT_EXPIRE }
//   );
//   const refreshToken = jwt.sign(
//     { userId: user._id },
//     process.env.REFRESH_TOKEN_SECRET,
//     { expiresIn: process.env.JWT_REFRESH_EXPIRE }
//   );

//   // Send the tokens back to the client
//   res.json({ accessToken, refreshToken });
// });

// Route to generate a new access token
app.post("/generate-new-access-token", async (req, res) => {
  try {
    // Verify the provided refresh token
    const decoded = jwt.verify(
      req.body.refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    // Check if the user still exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error("User not found");
    }
    // Generate a new access token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    res.json({ accessToken });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

// Endpoint for user login
app.post("/login", validateUserData, (req, res) => {
  // Authenticate user
  const { email, password } = req.body;
  User.findOne({ email, password }, (err, user) => {
    if (err || !user) {
      // Return error if invalid email or password
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }
    // Generate access token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    // Generate refresh token
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRE }
    );
    // Send access and refresh tokens as a response
    res.json({ accessToken, refreshToken });
  });
});

// Connect to MongoDB Atlas
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully");

    //
  })
  .catch((error) => {
    console.log(error);
  });

// Start the server on the specified port
app.listen(process.env.AUTH_SERVER_PORT, () => {
  console.log(`Auth server started on port ${process.env.AUTH_SERVER_PORT}`);
});
