const express = require('express');
const liveStreamController = require('../controllers/liveStreamController');
const router = express.Router();
    
// Route to create a new liveStream
router.post('/', liveStreamController.create);
    
// Route to get all liveStreams
router.get('/', liveStreamController.findAll);

// Route to get a liveStream by id
router.get('/:id', liveStreamController.findById);

// Route to update a liveStream by id
router.patch('/:id', liveStreamController.update);

// Route to delete a liveStream by id
router.delete('/:id', liveStreamController.delete);

module.exports = router;