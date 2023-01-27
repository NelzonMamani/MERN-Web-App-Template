const express = require('express');
const advertismentController = require('../controllers/advertismentController');
const router = express.Router();
    
// Route to create a new advertisment
router.post('/', advertismentController.create);
    
// Route to get all advertisments
router.get('/', advertismentController.findAll);

// Route to get a advertisment by id
router.get('/:id', advertismentController.findById);

// Route to update a advertisment by id
router.patch('/:id', advertismentController.update);

// Route to delete a advertisment by id
router.delete('/:id', advertismentController.delete);

module.exports = router;