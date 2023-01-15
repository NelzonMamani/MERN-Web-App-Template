const jwt = require('jsonwebtoken');

// authenticate Verifies  the token in the Authorization header 
// the function was verifyToken not it is authenticate
const authenticate = (req, res, next) => {
    // Get the token from the headers
    const token = req.headers['authorization'];
    // If no token is present in the headers, return a 401 status and message 'Access Denied'
    if (!token) {
        return res.status(401).send('Access Denied');
    }
    try {
        // Verify the token using the secret key
        const verified = jwt.verify(token, 'secret_key');
        // Attach the verified user to the request object
        req.user = verified;
        // Call the next middleware function
        next();
    } catch (err) {
        // If the token is invalid, return a 400 status and message 'Invalid Token'
        res.status(400).send('Invalid Token');
    }
}

// Authorize the user based on their role
const authorize = (req, res, next) => {
    // Check if the user's role is 'admin'
    if (req.user.role !== 'admin') {
        // If the user's role is not 'admin', return a 401 status and message 'Access Denied'
        return res.status(401).send('Access Denied');
    }
    // Call the next middleware function
    next();
}

// Export the middleware functions
module.exports = {authenticate, authorize};
