const express = require('express');
const commentController = require('../controllers/commentController');
const router = express.Router();
    
// Route to create a new comment
router.post('/', commentController.create);
    
// Route to get all comments
router.get('/', commentController.findAll);

// Route to get a comment by id
router.get('/:id', commentController.findById);

// Route to update a comment by id
router.patch('/:id', commentController.update);

// Route to delete a comment by id
router.delete('/:id', commentController.delete);

module.exports = router;