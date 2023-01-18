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

// login
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
    console.log(token);
    // Add the token to the user's tokens array
    user.tokens = user.tokens.concat({ token });
    await user.save();

    // // Send the JSON web token and the user object in the response
    // res.header("authorization", token).send({ message: "Logged in successfully", user });

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
// router.post("/logout", authenticate, async (req, res) => {
//   try {
//     // Get the current token from the Authorization header
//     const token = req.headers.authorization.replace("Bearer ", "");

//     // Remove the token from the user's tokens array
//     req.user.tokens = req.user.tokens.filter((t) => t.token !== token);
//     await req.user.save();
//     res.send({ message: "Successfully logged out" });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });


// router.post("/logout", authenticate, async (req, res) => {
//   try {
//     // Get the token from the Authorization header
//     const token = req.headers.authorization.replace("Bearer ", "");

//     // Remove the token from the user's tokens array
//     const updatedUser = await User.findByIdAndUpdate(req.user._id, {$pull: { tokens: { token: token } }});
//     if (!updatedUser) {
//         return res.status(404).send("User not found");
//     }
//     res.send({ message: "Successfully logged out" });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// router.post("/logout", authenticate, async (req, res) => {
//   try {
//     // Find the index of the current token in the user's tokens array
//     const tokenIndex = req.user.tokens.findIndex((token) => token.token === req.token);

//     // Remove the current token from the user's tokens array
//     req.user.tokens.splice(tokenIndex, 1);

//     // Save the user
//     await req.user.save();

//     res.send({ message: "Successfully logged out" });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// router.post("/logout", authenticate, async (req, res) => {
//   try {
//     // Get the token from the request
//     const token = req.headers.authorization.replace("Bearer ", "");

//     // Find the user with the matching token and remove it from their tokens array
//     await User.findOneAndUpdate(
//       { _id: req.user._id, tokens: { $elemMatch: { token } } },
//       { $pull: { tokens: { token } } }
//     );

//     res.send({ message: "Successfully logged out" });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// router.post("/logout", authenticate, async (req, res) => {
//   try {
//     // Get the token from the request headers
//     const token = req.headers.authorization.replace("Bearer ", "");

//     // Find the user object associated with that token
//     const user = await User.findOne({ _id: req.user._id, tokens: token });

//     // Remove the token from the user's token array
//     user.tokens = user.tokens.filter((t) => t !== token);

//     // Save the updated user object
//     await user.save();

//     res.send({ message: "Successfully logged out" });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// router.post("/logout", async (req, res) => {
//   try {
//     // Get the token from the headers
//     const token = req.headers['authorization'];
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // Find the user by ID
//     const user = await User.findById(decoded._id);
//     // Remove the invalid token from the user's tokens array
//     user.tokens = user.tokens.filter((t) => t.token !== token);
//     // Save the updated user
//     await user.save();
//     // Send a success response
//     res.send({ message: "Successfully logged out" });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
router.post("/logout", authenticate, async (req, res) => {
  try {
    // Get the token string from the Authorization header
    const token = req.headers.authorization.replace("Bearer ", "");

    // Find the user by ID
    const user = await User.findById(req.user._id);

    // Iterate through the user's tokens array to find the current token
    for (let i = 0; i < user.tokens.length; i++) {
      if (user.tokens[i].token === token) {
        // Remove the current token from the user's tokens array
        user.tokens.splice(i, 1);
        break;
      }
    }

    // Save the updated user with the current token removed
    await user.save();

    res.send({ message: "Successfully logged out" });
  } catch (error) {
    res.status(500).send(error);
  }
});



// 9. Logout all devices (POST /users/logoutAll)
// router.post("/logoutAll", async (req, res) => {
//   try {
//     const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

//     console.log(req.headers.authorization);
//     const user = await User.findOne({_id: decoded._id, 'tokens.token': req.headers.authorization});
//     console.log(user.tokens.token);
//     // Invalidate all of the user's tokens
//     user.tokens = [];
//     await user.save();
//     res.send({ message: "Logged out from all devices successfully" });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// router.post("/logoutAll", async (req, res) => {
//   try {
//     // Verify the JWT token in the request headers
//     const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

//     // Find the user in the database by their ID and the token in the tokens array
//     const user = await User.findOne({ _id: decoded._id, "tokens.token": req.headers.authorization });

//     // If no user is found, send a 401 response
//     if (!user) {
//       return res.status(401).send("Unauthorized");
//     }

//     // ************** Remove the token from the user's tokens array ******************
//     user.tokens = user.tokens.filter((token) => token.token !== req.headers.authorization);

//     // Save the updated user in the database
//     await user.save();

//     // Send a message indicating that the user has been logged out from all devices
//     res.send({ message: "Logged out from all devices successfully" });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// router.post('/logoutAll', async (req, res) => {
//   try {
//       // Verify the JWT token and get the user's ID
//       const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

//       // Find the user in the database using the ID
//       const user = await User.findById(decoded._id);

//       // Invalidate all of the user's tokens
//       user.tokens = [];
//       await user.save();

//       res.send({ message: 'Logged out from all devices successfully' });
//   } catch (error) {
//       res.status(500).send(error);
//   }
// });

router.post("/logoutAll", async (req, res) => {
  try {
    // Get the token string from the Authorization header
    // removing the "Bearer " prefix from the value of the "Authorization" header, leaving just the token.
    const token = req.headers.authorization.replace("Bearer ", "");

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    console.log("USER, BEFORE REMOVING TOKENS");

    console.log(user);
    // Invalidate all of the user's tokens
    user.tokens = [];
    // Save the updated user in the database
    await user.save();
    console.log("USER, AFTER REMOVING TOKENS");
    console.log(user);

    res.send({ message: "Logged out from all devices successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
