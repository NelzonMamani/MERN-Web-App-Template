const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");

require("dotenv").config();

const app = express();
app.use(express.json());

// Connect to the local MongoDB instance
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected successfully");

    // Create new user objects
    const user1 = new User({
      email: "user1@example.com",
      password: "password",
      name: "User One",
    });

    const user2 = new User({
      email: "user2@example.com",
      password: "password",
      name: "User Two",
    });

    // Insert the new users into the database
    User.insertMany([user1, user2])
      .then(() => {
        console.log("Users added successfully");
      })
      .catch((err) => {
        console.log(err);
      });

    // Start the Express server
    const PORT = process.env.PORT || 4001;
    app.listen(PORT, () => {
      console.log(`Backend web server listening for request on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
