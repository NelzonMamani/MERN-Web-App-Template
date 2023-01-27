const express = require('express');
const profileController = require('../controllers/profileController');
const router = express.Router();
    
// Route to create a new profile
router.post('/', profileController.create);
    
// Route to get all profiles
router.get('/', profileController.findAll);

// Route to get a profile by id
router.get('/:id', profileController.findById);

// Route to update a profile by id
router.patch('/:id', profileController.update);

// Route to delete a profile by id
router.delete('/:id', profileController.delete);

module.exports = router;