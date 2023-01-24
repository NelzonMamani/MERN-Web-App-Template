// auth.js middleware file that includes the check for different roles:
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// function to authenticate a user
const authenticate = async (req, res, next) => {
    // get the token from the Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');
    // try to decode and verify the token
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // get the user from the database
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        // if the user doesn't exist, throw an error
        if (!user) {
            throw new Error();
        }
        // add the user to the request object and the token to the response object
        req.user = user;
        req.token = token;
        // call the next middleware function
        next();
    } catch (error) {
        // if there's an error, send a 401 Unauthorized status and the error message
        res.status(401).json({ msg: 'Please authenticate' });
    }
};

// function to authorize a user based on their role
const authorize = (roles) => {
    return async (req, res, next) => {
        // check if the user's role is in the list of authorized roles
        if (!roles.includes(req.user.roles)) {
            return res.status(403).json({ msg: 'Forbidden' });
        }
        // call the next middleware function
        next();
    };
};

const validateAccessToken = (req, res, next) => {
  // Get the access token from the request headers
  const accessToken = req.headers.authorization;

  // If the access token is not provided, return an error
  if (!accessToken) {
    return res.status(401).send({ error: 'Access token is required' });
  }

  // Verify the access token
  try {
    // Decode the access token to get the user's ID
    const { _id } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    // Find the user by ID
    User.findById(_id)
      .then((user) => {
        // If the user is not found, return an error
        if (!user) {
          return res.status(401).send({ error: 'Invalid access token' });
        }

        // Attach the user to the request object
        req.user = user;

        // Move on to the next middleware/route handler
        next();
      })
      .catch((error) => {
        // If there was an error finding the user, return an error
        return res.status(401).send({ error: 'Invalid access token' });
      });
  } catch (error) {
    // If the access token is invalid, return an error
    return res.status(401).send({ error: 'Invalid access token' });
  }
};


module.exports = { authenticate, authorize, validateAccessToken };

// authenticate: This function is responsible for checking the request headers for a valid JSON Web Token (JWT) 
// and, if one is found, it decodes the token to extract the user's information 
// and attaches it to the request object so that it can be used in other middleware functions or route handlers.

// authorize: This function is responsible for checking if the authenticated user has the required role 
// to access a certain endpoint. It takes in a string argument which represents the required role, 
// and compares it to the role(s) stored in the user object obtained from the JWT. 
// If the user has the required role, the request is passed on to the next middleware or route handler.
// If not, an error is returned.

// validateAccessToken: This function is responsible for checking the request headers for a valid access token
// and if the token is not valid, the function will return an error.
