require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { authenticate, authorize } = require('./middleware/authBasic');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User');
 
const app = express();
app.use(express.json()); 
app.use('/users', userRoutes);


// Connect to MongoDB Atlas
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected successfully");

    // // Start the Express server
    // const PORT = process.env.PORT || 4500;
    // app.listen(PORT, () => {
    //   console.log(`Backend web server listening for request on port: ${PORT}`);
    // });
  })
  .catch((error) => {
    console.log(error);
  });
// Start the Express server
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`Backend web server listening for request on port: ${PORT}`);
});