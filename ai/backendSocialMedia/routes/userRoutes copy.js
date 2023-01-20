const express = require('express');
const { authenticate, authorize, validateAccessToken } = require('../middleware/auth');
const userController = require('../controllers/userController');

// Create a new router object
const router = express.Router();

// Route to create a new user
// This route requires no authentication or authorization
router.post('/', userController.create);

// Route to get all users
// This route requires authentication and authorization for the 'admin' role
router.get('/', authenticate, authorize('admin'), userController.findAll);

// Route to get a user by id
// This route requires authentication, but no authorization
router.get('/:id', authenticate, userController.findById);

// Route to update a user by id
// This route requires authentication and authorization for the 'admin' role
router.patch('/:id', authenticate, authorize('admin'), userController.update);

// Route to delete a user by id
// This route requires authentication and authorization for the 'admin' role
router.delete('/:id', authenticate, authorize('admin'), userController.delete);



// Logout current device
// This route will remove the token from the current device
// It requires the user to be authenticated
router.delete('/logout', authenticate, userController.logout);

// Logout all devices
// This route will remove all tokens for the user
// It requires the user to be authenticated and have the 'admin' role
router.delete('/logoutAll', authenticate, authorize('admin'), userController.logoutAll);


 

module.exports = router;





























// // const authenticate = require('../middleware/authenticate');
// // const authorize = require('../middleware/authorize');
// //const { authenticate, authorize } = require('../middleware/authenticate');

// router.post('/', authenticate, authorize('admin'), validate(postSchema), postController.create);

// const { authenticate, authorize } = require('../middleware/auth');
// const express = require('express');
// const router = express.Router();

// const userController = require('../controllers/userController');

// // Route to create a new user
// router.post('/', userController.create);

// // Route to get all users
// router.get('/', authenticate, authorize('admin'), userController.findAll);

// // Route to get a user by id
// router.get('/:id', authenticate, userController.findById);

// // Route to update a user by id
// router.put('/:id', authenticate, userController.update);

// // Route to delete a user by id
// router.delete('/:id', authenticate, userController.delete);

// module.exports = router;

// // const express = require('express');
// // const router = express.Router();
// // const userController = require('../controllers/userController');
// // const authenticate = require('../middleware/authenticate');
// // const authorize = require('../middleware/authorize');

// // // Route to get all users
// // router.get('/', authenticate, authorize('admin'), userController.index);

// // // Route to get a user by id
// // router.get('/:id', authenticate, userController.show);

// // // Route to create a new user
// // router.post('/', userController.create);

// // // Route to update a user by id
// // router.put('/:id', authenticate, authorize('admin'), userController.update);

// // // Route to delete a user by id
// // router.delete('/:id', authenticate, authorize('admin'), userController.delete);

// // module.exports = router;
