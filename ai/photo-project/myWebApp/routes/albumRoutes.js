const express = require('express');
const albumController = require('../controllers/albumController');
const router = express.Router();
    
// Route to create a new album
router.post('/', albumController.create);
    
// Route to get all albums
router.get('/', albumController.findAll);

// Route to get a album by id
router.get('/:id', albumController.findById);

// Route to update a album by id
router.patch('/:id', albumController.update);

// Route to delete a album by id
router.delete('/:id', albumController.delete);

module.exports = router;