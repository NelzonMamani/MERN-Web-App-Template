const User = require('../models/user');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// Create a new user
exports.createUser = async (req, res) => {
    // Validate user data
    const { error } = validateUserData(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // Check if email already exists in the database
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ message: 'Email already exists' });

    // Create a new user
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        status: req.body.status
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Save the user to the database
    await user.save();

    // Create and assign JSON web tokens
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRE });

    // Send the access and refresh tokens to the client
    res.json({ accessToken, refreshToken });
};

// Get all users
exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

// Get a single user
exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
};

// Update a user
exports.updateUser = async (req, res) => {
    const { error } = validateUserData(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        status: req.body.status
    }, { new: true });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
}
