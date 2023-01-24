const express = require('express');
const storyController = require('../controllers/storyController');
const router = express.Router();
    
// Route to create a new story
router.post('/', storyController.create);
    
// Route to get all storys
router.get('/', storyController.findAll);

// Route to get a story by id
router.get('/:id', storyController.findById);

// Route to update a story by id
router.patch('/:id', storyController.update);

// Route to delete a story by id
router.delete('/:id', storyController.delete);

module.exports = router;