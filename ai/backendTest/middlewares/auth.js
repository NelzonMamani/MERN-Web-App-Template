const jwt = require('jsonwebtoken');

require('dotenv').config();

// Middleware function to authenticate a user
const authenticate = (req, res, next) => {
  // Get the access token from the request headers
  const accessToken = req.headers['x-access-token'] || req.headers['authorization'];

  // If there is no access token, return an error
  if (!accessToken) {
    return res.status(401).json({
      error: 'Access token is required to access this resource'
    });
  }

  // Verify the access token
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({
      error: 'Invalid access token'
    });
  }
};

// Middleware function to authorize a user based on their role
const authorize = (roles) => {
  return (req, res, next) => {
    // Get the user's role from the database
    User.findById(req.userId, (err, user) => {
      if (err || !user) {
        return res.status(401).json({
          error: 'User not found'
        });
      }

      // Check if the user's role is authorized to access the resource
      if (!roles.includes(user.role)) {
        return res.status(403).json({
          error: 'You are not authorized to access this resource'
        });
      }

      next();
    });
  };
};

module.exports = { authenticate, authorize };
