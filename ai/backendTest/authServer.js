const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('./models/user');
const { validateUserData } = require('./middlewares/validation');

require('dotenv').config();

const app = express();
app.use(express.json());

/**
 * Route to handle user registration
 * This route expects the following payload:
 * {
 *    "name": "John Doe",
 *    "email": "johndoe@example.com",
 *    "password": "password",
 *    "role": "admin",
 *    "status": "active"
 * }
 */
app.post("/register", validateUserData, async (req, res) => {
    try {
        // Create a new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            status: req.body.status
        });

        // Save the user to the database
        const savedUser = await user.save();

        // Generate access and refresh tokens for the user
        const accessToken = jwt.sign({ userId: savedUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRE });
        const refreshToken = jwt.sign({ userId: savedUser._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRE });

        // Send the tokens to the client
        res.json({ accessToken, refreshToken });
    } catch (err) {
        res.status(500).json({ message: "Error creating user", error: err });
    }
});

/**
 * Route to generate a new access token
 * This route expects the following payload:
 * {
 *    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjE4Yjg4MzE0YjM4YzAwMDAwMDAwMSIsImlhdCI6MTYxNjQ2NjIyNSwiZXhwIjoxNjE2NDY2NjI1fQ.RvJF-9z6_KM_U3cqUJgGJg1f0wUJZz0HZG5vQ2M9Fk0"
 * }
 */
 

app.post('/generate-new-access-token', async (req, res) => {
  try {
      // Verify the refresh token
      const { refreshToken } = req.body;
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
          if (err) {
              return res.status(401).json({
                  message: 'Invalid refresh token'
              });
          }
          
          // Connect to MongoDB
          const uri = process.env.MONGO_URI;
          mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
          const connection = mongoose.connection;
          connection.once('open', () => {
              console.log("MongoDB connected successfully");
              
              // Find the user in the database and check if the refresh token is still valid
              User.findById(user.userId, (err, user) => {
                  if (err || !user) {
                      return res.status(401).json({
                          message: 'User not found'
                      });
                  }
                  
                  if (user.refreshToken !== refreshToken) {
                      return res.status(401).json({
                          message: 'Invalid refresh token'
                      });
                  }
                  
                  // Generate a new access token
                  const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRE });
                  res.json({ accessToken });
              });
          });
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({
          message: 'Server error'
      });
  }
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

// start the server
app.listen(process.env.AUTH_SERVER_PORT, () => {
console.log(`Auth server started on port ${process.env.AUTH_SERVER_PORT}`);
});

          