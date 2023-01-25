const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth');
const { validateUserData } = require('../middlewares/validation');
const { createUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

// Route to create a new user
// validateUserData middleware is used to ensure the data sent by the client is valid
// before creating a new user
router.post('/', validateUserData, createUser);

// Route to get all users (admin only)
// authenticate middleware is used to ensure the user is logged in
// authorize middleware is used to ensure the user has the admin role
router.get('/', authenticate, authorize(['admin']), getUsers);

// Route to get a single user by id
// authenticate middleware is used to ensure the user is logged in
router.get('/:id', authenticate, getUser);

// Route to update a user (admin only)
// authenticate middleware is used to ensure the user is logged in
// authorize middleware is used to ensure the user has the admin role
router.patch('/:id', authenticate, authorize(['admin']), updateUser);

// Route to delete a user (admin only)
// authenticate middleware is used to ensure the user is logged in
// authorize middleware is used to ensure the user has the admin role
router.delete('/:id', authenticate, authorize(['admin']), deleteUser);

module.exports = router;

