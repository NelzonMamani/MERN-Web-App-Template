const express = require('express');
const reportFlagController = require('../controllers/reportFlagController');
const router = express.Router();
    
// Route to create a new reportFlag
router.post('/', reportFlagController.create);
    
// Route to get all reportFlags
router.get('/', reportFlagController.findAll);

// Route to get a reportFlag by id
router.get('/:id', reportFlagController.findById);

// Route to update a reportFlag by id
router.patch('/:id', reportFlagController.update);

// Route to delete a reportFlag by id
router.delete('/:id', reportFlagController.delete);

module.exports = router;