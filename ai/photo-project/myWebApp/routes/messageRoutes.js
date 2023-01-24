const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();
    
// Route to create a new message
router.post('/', messageController.create);
    
// Route to get all messages
router.get('/', messageController.findAll);

// Route to get a message by id
router.get('/:id', messageController.findById);

// Route to update a message by id
router.patch('/:id', messageController.update);

// Route to delete a message by id
router.delete('/:id', messageController.delete);

module.exports = router;