const express = require('express');
const analyticController = require('../controllers/analyticController');
const router = express.Router();
    
// Route to create a new analytic
router.post('/', analyticController.create);
    
// Route to get all analytics
router.get('/', analyticController.findAll);

// Route to get a analytic by id
router.get('/:id', analyticController.findById);

// Route to update a analytic by id
router.patch('/:id', analyticController.update);

// Route to delete a analytic by id
router.delete('/:id', analyticController.delete);

module.exports = router;