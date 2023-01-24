const express = require('express');
const notificationController = require('../controllers/notificationController');
const router = express.Router();
    
// Route to create a new notification
router.post('/', notificationController.create);
    
// Route to get all notifications
router.get('/', notificationController.findAll);

// Route to get a notification by id
router.get('/:id', notificationController.findById);

// Route to update a notification by id
router.patch('/:id', notificationController.update);

// Route to delete a notification by id
router.delete('/:id', notificationController.delete);

module.exports = router;