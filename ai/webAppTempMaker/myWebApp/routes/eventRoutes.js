const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();
    
// Route to create a new event
router.post('/', eventController.create);
    
// Route to get all events
router.get('/', eventController.findAll);

// Route to get a event by id
router.get('/:id', eventController.findById);

// Route to update a event by id
router.patch('/:id', eventController.update);

// Route to delete a event by id
router.delete('/:id', eventController.delete);

module.exports = router;