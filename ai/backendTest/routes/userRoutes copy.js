const express = require('express');
const { authenticate, authorize } = require('../middlewares/auth');
const { validateUserData } = require('../middlewares/validation');
const { createUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.post('/', validateUserData, createUser);
router.get('/', authenticate, authorize(['admin']), getUsers);
router.get('/:id', authenticate, getUser);
router.patch('/:id', authenticate, authorize(['admin']), updateUser);
router.delete('/:id', authenticate, authorize(['admin']), deleteUser);

module.exports = router;
