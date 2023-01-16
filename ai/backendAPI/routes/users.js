require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { authenticate } = require("../config/middleware");

router.post("/register", async (req, res) => {
  try {
    // Hash the user's password before saving it to the database
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword);

    // Create a new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });

    // Save the user to the database
    const savedUser = await user.save();

    // Create a JSON web token
    const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);
    res
      .header("authorization", token)
      .send({ message: "User created successfully", user: savedUser });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    // Find a user in the database with the provided email
    const user = await User.findOne({ email: req.body.email });

    // If the user does not exist, send a 404 response
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // If the password is not valid, send a 401 response
    if (!isPasswordValid) {
      return res.status(401).send("Unauthorized");
    }

    // Generate a JSON web token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Send the JSON web token and the user object in the response
    res
      .header("authorization", token)
      .send({ message: "Logged in successfully", user });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Retrieve all users (GET /users)
router.get("/", async (req, res) => {
  try {
    // Find all users in the database
    const users = await User.find();

    // Send the users in the response
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Retrieve a single user by ID (GET /users/:id)
router.get("/:id", async (req, res) => {
  try {
    // Find a user in the database with the provided id
    const user = await User.findById(req.params.id);

    // If the user does not exist, send a 404 response
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Send the user object in the response
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a user by ID (PUT/PATCH /users/:id)
// Please note that the difference between PUT and PATCH is that
// PUT replaces the whole document while PATCH updates the fields provided in the request body.
router.patch("/:id", async (req, res) => {
  try {
    // Find the user by ID and update it with the provided data
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // If the user is not found, send a 404 response
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    // Send the updated user in the response
    res.send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a user by ID (DELETE /users/:id)
// This code uses the findByIdAndDelete method from Mongoose
// to find and delete the user with the specified ID in the request's parameters.
// If the user is not found, it sends a 404 response, otherwise it sends a success message.

router.delete("/:id", async (req, res) => {
  try {
    // Find and delete the user by ID
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    // If the user does not exist, send a 404 response
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }

    // Send a success response
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// implement pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalUsers = await User.countDocuments();
    const users = await User.find().skip(skip).limit(limit);
    res.send({
      users,
      page,
      totalPages: Math.ceil(totalUsers / limit),
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// filtering users by role:
router.get("/", async (req, res) => {
  try {
    const role = req.query.role;
    let filter = {};
    if (role) {
      filter = { role: role };
    }
    const users = await User.find(filter);
    res.send({ users });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Implement filtering (GET /users?role=admin)
//GET http://localhost:4000/users?role=admin
//GET http://localhost:4000/users?role=admin&page=1&limit=10

router.get("/", async (req, res) => {
  const role = req.query.role;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const query = {};
  if (role) {
    query.role = role;
  }
  try {
    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    res.send({ message: "Users retrieved successfully", users });
  } catch (error) {
    res.status(400).send(error);
  }
});
//This code is checking if the role parameter is present in the query string, and if it is, it adds it to the query object. Then, it uses the skip and limit methods to implement pagination.

//7. Retrieve the current user (GET /users/me)
router.get("/me", authenticate, async (req, res) => {
  try {
    // Find the user in the database with the _id in the JWT
    const user = await User.findById(req.user._id);

    // If the user is not found, send a 404 response
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Send the user object in the response
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});
// Here is an example of a REST client request for the "Retrieve the current user (GET /users/me)" endpoint:
// GET http://localhost:4000/users/me
// Content-Type: application/json
// Authorization: Bearer <insert_token_here>
// Note:

// You need to replace <insert_token_here> with a valid token that you've received from logging in.
// The Authorization header is used to send the JWT token to the server for authentication and authorization.

// router.get("/me", authenticate, async (req, res) => {
//   try {
//     // Get the user ID from the verified token
//     const userId = req.user._id;
//     // Find the user by ID
//     const user = await User.findById(userId);
//     // If no user is found, return a 404 status and message 'User not found'
//     if (!user) {
//       return res.status(404).send("User not found");
//     }
//     // If a user is found, return a 200 status and the user object
//     res.send(user);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// Logout a user (POST /users/logout)
router.post("/logout", authenticate, async (req, res) => {
  try {
    // Invalidate the user's token
    req.user.token = null;
    await req.user.save();
    res.send({ message: "Successfully logged out" });
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
