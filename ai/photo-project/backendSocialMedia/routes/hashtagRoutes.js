const express = require('express');
const hashtagController = require('../controllers/hashtagController');
const router = express.Router();
    
// Route to create a new hashtag
router.post('/', hashtagController.create);
    
// Route to get all hashtags
router.get('/', hashtagController.findAll);

// Route to get a hashtag by id
router.get('/:id', hashtagController.findById);

// Route to update a hashtag by id
router.patch('/:id', hashtagController.update);

// Route to delete a hashtag by id
router.delete('/:id', hashtagController.delete);

module.exports = router;