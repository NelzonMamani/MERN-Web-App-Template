const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");

require("dotenv").config();

const app = express();
app.use(express.json());

const uri = process.env.LOCAL_MONGO_URI;
//mongoose.connect(process.env.LOCAL_MONGO_URI, { useNewUrlParser: true, useCreateIndex: true })

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("MongoDB Connected successfully");

    const user1 = new User({
      email: "user1@example.com",
      password: "password",
      name: "User One"
    });

    const user2 = new User({
      email: "user2@example.com",
      password: "password",
      name: "User Two"
    });

    User.insertMany([user1, user2])
      .then(() => {
        console.log("Users added successfully");
      })
      .catch(err => {
        console.log(err);
      });
  })
  .catch(err => {
    console.log("MongoDB connection error: " + err);
    process.exit();
  });

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Backend web server listening for request on port: ${PORT}`);
});
