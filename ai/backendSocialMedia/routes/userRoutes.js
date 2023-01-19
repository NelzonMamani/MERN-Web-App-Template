// const authenticate = require('../middleware/authenticate');
// const authorize = require('../middleware/authorize');
//const { authenticate, authorize } = require('../middleware/authenticate');

router.post('/', authenticate, authorize('admin'), validate(postSchema), postController.create);

const { authenticate, authorize } = require('../middleware/auth');
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Route to create a new user
router.post('/', userController.create);

// Route to get all users
router.get('/', authenticate, authorize('admin'), userController.findAll);

// Route to get a user by id
router.get('/:id', authenticate, userController.findById);

// Route to update a user by id
router.put('/:id', authenticate, userController.update);

// Route to delete a user by id
router.delete('/:id', authenticate, userController.delete);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');
// const authenticate = require('../middleware/authenticate');
// const authorize = require('../middleware/authorize');

// // Route to get all users
// router.get('/', authenticate, authorize('admin'), userController.index);

// // Route to get a user by id
// router.get('/:id', authenticate, userController.show);

// // Route to create a new user
// router.post('/', userController.create);

// // Route to update a user by id
// router.put('/:id', authenticate, authorize('admin'), userController.update);

// // Route to delete a user by id
// router.delete('/:id', authenticate, authorize('admin'), userController.delete);

// module.exports = router;
