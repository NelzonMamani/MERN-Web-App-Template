const express = require('express');
const router = express.Router();

// Retrieve all users
// GET /users
router.get('/', (req, res) => {
    // Function body to handle retrieving all users
});

// Retrieve a single user by ID
// GET /users/:id
router.get('/:id', (req, res) => {
    // Function body to handle retrieving a single user by ID
});

// Create a new user
// POST /users
router.post('/', (req, res) => {
    // Function body to handle creating a new user
});

// Update an existing user by ID
// PATCH /users/:id
router.patch('/:id', (req, res) => {
    // Function body to handle updating an existing user by ID
});

// Delete an existing user by ID
// DELETE /users/:id
router.delete('/:id', (req, res) => {
    // Function body to handle deleting an existing user by ID
});

// Retrieve all posts from a specific user
// GET /users/:id/posts
router.get('/:id/posts', (req, res) => {
    // Function body to handle retrieving all posts from a specific user
});

// Retrieve all comments from a specific user
// GET /users/:id/comments
router.get('/:id/comments', (req, res) => {
    // Function body to handle retrieving all comments from a specific user
});

// Retrieve all friends of a specific user
// GET /users/:id/friends
router.get('/:id/friends', (req, res) => {
    // Function body to handle retrieving all friends of a specific user
});

// Add a friend to a specific user
// POST /users/:id/addfriend
router.post('/:id/addfriend', (req, res) => {
    // Function body to handle adding a friend to a specific user
});

// Remove a friend from a specific user
// DELETE /users/:id/removefriend
router.delete('/:id/removefriend', (req, res) => {
    // Function body to handle removing a friend from a specific user
});

// Retrieve all notifications of a specific user
// GET /users/:id/notifications
router.get('/:id/notifications', (req, res) => {
    // Function body to handle retrieving all notifications of a specific user
});

// Mark all notifications as read for a specific user
// PATCH /users/:id/notifications
router.patch('/:id/notifications', (req, res) => {
    // Function body to handle marking all notifications as read for a specific user
});

// Retrieve the settings of a specific user
// GET /users/:id/settings
router.get('/:id/settings', (req, res) => {
    // Function body to handle retrieving the settings of a specific user
});

 
// Update the settings of a specific user
// PATCH /users/:id/settings
router.patch('/:id/settings', (req, res) => {
    // Function body to handle updating the settings of a specific user
});

// Log a user in
// POST /users/login
router.post('/login', (req, res) => {
    // Function body to handle logging a user in
});

// Log a user out
// POST /users/logout
router.post('/logout', (req, res) => {
    // Function body to handle logging a user out
});

// Log a user out of all devices
// POST /users/logoutall
router.post('/logoutall', (req, res) => {
    // Function body to handle logging a user out of all devices
});

// Update password of a specific user
// PATCH /users/:id/password
router.patch('/:id/password', (req, res) => {
    // Function body to handle updating the password of a specific user
});

// Retrieve a user's profile
// GET /users/:id/profile
router.get('/:id/profile', (req, res) => {
    // Function body to handle retrieving a user's profile
});

// Update a user's profile
// PATCH /users/:id/profile
router.patch('/:id/profile', (req, res) => {
    // Function body to handle updating a user's profile
});

// Retrieve all messages of a specific user
// GET /users/:id/messages
router.get('/:id/messages', (req, res) => {
    // Function body to handle retrieving all messages of a specific user
});

// Send a message to a specific user
// POST /users/:id/messages
router.post('/:id/messages', (req, res) => {
    // Function body to handle sending a message to a specific user
});

// Mark all messages as read for a specific user
// PATCH /users/:id/messages
router.patch('/:id/messages', (req, res) => {
    // Function body to handle marking all messages as read for a specific user
});

// Retrieve all subscriptions of a specific user
// GET /users/:id/subscriptions
router.get('/:id/subscriptions', (req, res) => {
    // Function body to handle retrieving all subscriptions of a specific user
});

// Subscribe to a specific user
// POST /users/:id/subscriptions
router.post('/:id/subscriptions', (req, res) => {
    // Function body to handle subscribing to a specific user
});

// Unsubscribe from a specific user
// DELETE /users/:id/subscriptions
router.delete('/:id/subscriptions', (req, res) => {
    // Function body to handle unsubscribing from a specific user
});

 
// Retrieve all subscribers of a specific user
// GET /users/:id/subscribers
router.get('/:id/subscribers', (req, res) => {
    // Function body to handle retrieving all subscribers of a specific user
});

// Retrieve all activity of a specific user
// GET /users/:id/activity
router.get('/:id/activity', (req, res) => {
    // Function body to handle retrieving all activity of a specific user
});

// Retrieve all achievements of a specific user
// GET /users/:id/achievements
router.get('/:id/achievements', (req, res) => {
    // Function body to handle retrieving all achievements of a specific user
});

// Unlock an achievement for a specific user
// POST /users/:id/achievements
router.post('/:id/achievements', (req, res) => {
    // Function body to handle unlocking an achievement for a specific user
});

// Retrieve all rewards of a specific user
// GET /users/:id/rewards
router.get('/:id/rewards', (req, res) => {
    // Function body to handle retrieving all rewards of a specific user
});

// Redeem a reward for a specific user
// POST /users/:id/rewards
router.post('/:id/rewards', (req, res) => {
    // Function body to handle redeeming a reward for a specific user
});

// Retrieve all items in a user's inventory
// GET /users/:id/inventory
router.get('/:id/inventory', (req, res) => {
    // Function body to handle retrieving all items in a user's inventory
});

// Add an item to a user's inventory
// POST /users/:id/inventory
router.post('/:id/inventory', (req, res) => {
    // Function body to handle adding an item to a user's inventory
});

// Remove an item from a user's inventory
// DELETE /users/:id/inventory
router.delete('/:id/inventory', (req, res) => {
    // Function body to handle removing an item from a user's inventory
});

// Retrieve the current location of a specific user
// GET /users/:id/location
router.get('/:id/location', (req, res) => {
    // Function body to handle retrieving the current location of a specific user
});

// Update the current location of a specific user
// PATCH /users/:id/location
router.patch('/:id/location', (req, res) => {
    // Function body to handle updating the current location of a specific user
});

// Retrieve the current locations of all friends of a specific user
// GET /users/:id/friends/location
router.get('/:id/friends/location', (req, res) => {
    // Function body to handle retrieving the current locations of all friends of a specific user
});


// Retrieve all check-ins of a specific user
// GET /users/:id/checkins
router.get('/:id/checkins', (req, res) => {
    // Function body to handle retrieving all check-ins of a specific user
});

// Add check-in for a specific user
// POST /users/:id/checkins
router.post('/:id/checkins', (req, res) => {
    // Function body to handle adding check-in for a specific user
});

// Delete check-in for a specific user
// DELETE /users/:id/checkins/:checkinId
router.delete('/:id/checkins/:checkinId', (req, res) => {
    // Function body to handle deleting check-in for a specific user
});

module.exports = router;

