const User = require("../models/User");
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');


// function to create a new user
const create = async (req, res) =>{
  try {
    // validate the incoming user data
    const { name, email, password } = req.body;

    // check if the email is valid
    if (!validator.isEmail(email)) {
      return res.status(400).json({ msg: 'Invalid email' });
    }

    // check if the name and password are provided
    if (!name || !password) {
      return res.status(400).json({ msg: 'Name and password are required' });
    }

    // check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      roles: ['basic'], // assign a default role of 'basic'
    });

    // save the user to the database
    await user.save();

    // create a JSON web token for the user
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET);

    // send the access token and refresh token to the client
    res.json({ accessToken, refreshToken });
  } catch (error) {
    // if there's an error, send a 500 Internal Server Error status and the error message
    res.status(500).json({ msg: error.message });
  }
}

module.exports = {
  create
}














// const User = require("../models/User");

// // exports an object containing all the user-related functions
// module.exports = {
//   // function to create a new user
//   async create(req, res) {
//     try {
//       // create a new user using the data from the request body
//       const user = new User(req.body);
//       // save the user to the database
//       await user.save();
//       // send a 201 Created status and the user data
//       res.status(201).json({ user });
//     } catch (error) {
//       // if there's an error, send a 500 Internal Server Error status and the error message
//       res.status(500).json({ msg: error.message });
//     }
//   },
//   // function to get all users
//   async findAll(req, res) {
//     try {
//       // find all users in the database
//       const users = await User.find();
//       // send a 200 OK status and the users data
//       res.json({ users });
//     } catch (error) {
//       // if there's an error, send a 500 Internal Server Error status and the error message
//       res.status(500).json({ msg: error.message });
//     }
//   },
//   // function to get a single user by id
//   async findById(req, res) {
//     try {
//       // find the user by id in the database
//       const user = await User.findById(req.params.id);
//       // if no user is found, send a 404 Not Found status
//       if (!user) {
//         return res.status(404).json({ msg: "User not found" });
//       }
//       // send a 200 OK status and the user data
//       res.json({ user });
//     } catch (error) {
//       // if there's an error, send a 500 Internal Server Error status and the error message
//       res.status(500).json({ msg: error.message });
//     }
//   },
//   // function to update a user by id
//   async update(req, res) {
//     try {
//       // find and update the user by id in the database
//       const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//       });
//       // if no user is found, send a 404 Not Found status
//       if (!user) {
//         return res.status(404).json({ msg: "User not found" });
//       }
//       // send a 200 OK status and the updated user data
//       res.json({ user });
//     } catch (error) {
//       // if there's an error, send a 500 Internal Server Error status and the error message
//       res.status(500).json({ msg: error.message });
//     }
//   },
//   // function to delete a user by id
//   async delete(req, res) {
//     try {
//       // find and delete the user by id in the database
//       const user = await User.findByIdAndDelete(req.params.id);
//       // if no user is found, send a 404 Not Found status
//       if (!user) {
//         return res.status(404).json({ msg: "User not found" });
//       }
//       // send a 200 OK status and a message indicating that the user was deleted
//       res.json({ msg: "User deleted" });
//     } catch (error) {
//       // if there's an error, send a 500 Internal Server Error status and the error message
//       res.status(500).json({ msg: error.message });
//     }
//   },
//   // Logout current device
//   // This function will remove the token from the current device
//   // It requires the user to be authenticated
//   async logout(req, res) {
//     try {
//       // Get the current user
//       const user = req.user;

//       // Remove the token from the user's tokens array
//       user.tokens = user.tokens.filter((token) => token.token !== req.token);
//       await user.save();

//       // Send success response
//       res.send();
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   },

//   // Logout all devices
//   // This function will remove all tokens for the user
//   // It requires the user to be authenticated and have the 'admin' role
//   async logoutAll(req, res) {
//     try {
//       // Get the current user
//       const user = req.user;

//       // Remove all tokens from the user's tokens array
//       user.tokens = [];
//       await user.save();

//       // Send success response
//       res.send();
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   },
// };
