const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
    
// Route to create a new user
router.post('/', userController.create);
    
// Route to get all users
router.get('/', userController.findAll);

// Route to get a user by id
router.get('/:id', userController.findById);

// Route to update a user by id
router.patch('/:id', userController.update);

// Route to delete a user by id
router.delete('/:id', userController.delete);

module.exports = router;