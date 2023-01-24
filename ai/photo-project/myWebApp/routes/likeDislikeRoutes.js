const express = require('express');
const likeDislikeController = require('../controllers/likeDislikeController');
const router = express.Router();
    
// Route to create a new likeDislike
router.post('/', likeDislikeController.create);
    
// Route to get all likeDislikes
router.get('/', likeDislikeController.findAll);

// Route to get a likeDislike by id
router.get('/:id', likeDislikeController.findById);

// Route to update a likeDislike by id
router.patch('/:id', likeDislikeController.update);

// Route to delete a likeDislike by id
router.delete('/:id', likeDislikeController.delete);

module.exports = router;