const express = require('express');
const photoVideoController = require('../controllers/photoVideoController');
const router = express.Router();
    
// Route to create a new photoVideo
router.post('/', photoVideoController.create);
    
// Route to get all photoVideos
router.get('/', photoVideoController.findAll);

// Route to get a photoVideo by id
router.get('/:id', photoVideoController.findById);

// Route to update a photoVideo by id
router.patch('/:id', photoVideoController.update);

// Route to delete a photoVideo by id
router.delete('/:id', photoVideoController.delete);

module.exports = router;