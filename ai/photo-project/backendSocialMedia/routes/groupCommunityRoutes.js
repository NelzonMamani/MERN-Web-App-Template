const express = require('express');
const groupCommunityController = require('../controllers/groupCommunityController');
const router = express.Router();
    
// Route to create a new groupCommunity
router.post('/', groupCommunityController.create);
    
// Route to get all groupCommunitys
router.get('/', groupCommunityController.findAll);

// Route to get a groupCommunity by id
router.get('/:id', groupCommunityController.findById);

// Route to update a groupCommunity by id
router.patch('/:id', groupCommunityController.update);

// Route to delete a groupCommunity by id
router.delete('/:id', groupCommunityController.delete);

module.exports = router;