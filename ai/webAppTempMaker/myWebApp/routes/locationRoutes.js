const express = require('express');
const locationController = require('../controllers/locationController');
const router = express.Router();
    
// Route to create a new location
router.post('/', locationController.create);
    
// Route to get all locations
router.get('/', locationController.findAll);

// Route to get a location by id
router.get('/:id', locationController.findById);

// Route to update a location by id
router.patch('/:id', locationController.update);

// Route to delete a location by id
router.delete('/:id', locationController.delete);

module.exports = router;