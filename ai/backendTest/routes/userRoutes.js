const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth');
const { validateUserData, validateUserUpdateData } = require('../middlewares/validation');
const { createUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

// Endpoint to create a new user
// Validates the incoming user data, creates a new user and returns a success message
router.post('/', validateUserData, createUser);

// Endpoint to get all users
// Authenticates the request and authorizes it if the user is an admin
// Returns a list of all users
router.get('/', authenticate, authorize(['admin']), getUsers);

// Endpoint to get a specific user by ID
// Authenticates the request and returns the user with the specified ID
router.get('/:id', authenticate, getUser);

// Endpoint to update a specific user by ID
// Authenticates the request and authorizes it if the user is an admin
// Validates the incoming user update data and updates the user with the specified ID
router.patch('/:id', authenticate, authorize(['admin']), validateUserUpdateData, updateUser);

// Endpoint to delete a specific user by ID
// Authenticates the request and authorizes it if the user is an admin
// Deletes the user with the specified ID
router.delete('/:id', authenticate, authorize(['admin']), deleteUser);

module.exports = router;
