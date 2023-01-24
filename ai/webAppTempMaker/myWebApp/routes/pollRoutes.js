const express = require('express');
const pollController = require('../controllers/pollController');
const router = express.Router();
    
// Route to create a new poll
router.post('/', pollController.create);
    
// Route to get all polls
router.get('/', pollController.findAll);

// Route to get a poll by id
router.get('/:id', pollController.findById);

// Route to update a poll by id
router.patch('/:id', pollController.update);

// Route to delete a poll by id
router.delete('/:id', pollController.delete);

module.exports = router;