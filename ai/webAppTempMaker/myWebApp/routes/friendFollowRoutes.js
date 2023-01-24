const express = require('express');
const friendFollowController = require('../controllers/friendFollowController');
const router = express.Router();
    
// Route to create a new friendFollow
router.post('/', friendFollowController.create);
    
// Route to get all friendFollows
router.get('/', friendFollowController.findAll);

// Route to get a friendFollow by id
router.get('/:id', friendFollowController.findById);

// Route to update a friendFollow by id
router.patch('/:id', friendFollowController.update);

// Route to delete a friendFollow by id
router.delete('/:id', friendFollowController.delete);

module.exports = router;