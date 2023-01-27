const express = require('express');
const searchController = require('../controllers/searchController');
const router = express.Router();
    
// Route to create a new search
router.post('/', searchController.create);
    
// Route to get all searchs
router.get('/', searchController.findAll);

// Route to get a search by id
router.get('/:id', searchController.findById);

// Route to update a search by id
router.patch('/:id', searchController.update);

// Route to delete a search by id
router.delete('/:id', searchController.delete);

module.exports = router;