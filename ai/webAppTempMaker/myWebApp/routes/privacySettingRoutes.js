const express = require('express');
const privacySettingController = require('../controllers/privacySettingController');
const router = express.Router();
    
// Route to create a new privacySetting
router.post('/', privacySettingController.create);
    
// Route to get all privacySettings
router.get('/', privacySettingController.findAll);

// Route to get a privacySetting by id
router.get('/:id', privacySettingController.findById);

// Route to update a privacySetting by id
router.patch('/:id', privacySettingController.update);

// Route to delete a privacySetting by id
router.delete('/:id', privacySettingController.delete);

module.exports = router;