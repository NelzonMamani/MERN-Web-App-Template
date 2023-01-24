const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();
    
// Route to create a new post
router.post('/', postController.create);
    
// Route to get all posts
router.get('/', postController.findAll);

// Route to get a post by id
router.get('/:id', postController.findById);

// Route to update a post by id
router.patch('/:id', postController.update);

// Route to delete a post by id
router.delete('/:id', postController.delete);

module.exports = router;