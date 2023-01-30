const express = require("express");
const mongoose = require("mongoose");
//const { authenticate } = require("./middlewares/auth");
require("dotenv").config();

const app = express();
app.use(express.json());

//app.use("/users", require("./routes/userRoutes"));
//app.use('/posts', authenticate, require('./routes/postRoutes'));
// app.use('/comments', authenticate, require('./routes/commentRoutes'));



 

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





// Connect to MongoDB Atlas or localhost
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas successfully");
    //console.log("Connected to local MongoDB successfully");
  })
  .catch((error) => {
    console.log(error);
  });

// start the server
app.listen(process.env.AUTH_SERVER_PORT, () => {
console.log(`Auth server started on port ${process.env.AUTH_SERVER_PORT}`);
});

  