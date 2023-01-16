const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticate = require('../config/middleware/authenticate');

router.post('/logout', authenticate, (req, res) => {
  const token = req.headers['authorization'];

  // Blacklist the token
  // You would need to implement a blacklisting system to store tokens that have been logged out
  // You can then check against this list before verifying a token in the authenticate middleware

  // Send a message to the client indicating that the user has been logged out
  res.json({ message: 'User successfully logged out' });
});

module.exports = router;
