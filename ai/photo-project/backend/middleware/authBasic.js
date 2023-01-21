const jwt = require('jsonwebtoken');

module.exports = {
    authenticate: (req, res, next) => {
        try {
            // Get the token from the headers
            const token = req.headers.authorization.split(' ')[1];
            // Verify the token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            // Add the user id to the request object
            req.user = decoded._id;
            // Call the next middleware
            next();
        } catch (error) {
            // If the token is invalid, return a 401 Unauthorized status
            res.status(401).json({ msg: 'Invalid token' });
        }
    },
    authorize: (roles) => (req, res, next) => {
        // Find the user in the database
        User.findById(req.user)
            .then((user) => {
                // If the user is not found, return a 404 Not Found status
                if (!user) {
                    return res.status(404).json({ msg: 'User not found' });
                }
                // If the user's role is not in the allowed roles, return a 403 Forbidden status
                if (!roles.includes(user.role)) {
                    return res.status(403).json({ msg: 'Forbidden' });
                }
                // If the user's role is allowed, call the next middleware
                next();
            })
            .catch((error) => {
                // If there's an error, return a 500 Internal Server Error status and the error message
                res.status(500).json({ msg: error.message });
            });
    }
};




// const authenticate = require('./authenticate');
// const authorize = require('./authorize');

// module.exports = {
//     authenticate,
//     authorize
// }




// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// // this middleware function will check if the client is sending a valid token in the headers
// module.exports = async (req, res, next) => {
//     try {
//         // get the token from the headers
//         const token = req.headers.authorization.split(" ")[1];

//         // verify the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
//         // find the user using the userId from the payload
//         const user = await User.findById(decoded.userId);

//         // if the user not found, return 401 unauthorized
//         if (!user) {
//             return res.status(401).json({ msg: 'User not found' });
//         }
//         // attach the user to the request object
//         req.user = user;
//         // call the next middleware
//         next();
//     } catch (err) {
//         // if the token is not valid, return 401 unauthorized
//         return res.status(401).json({ msg: 'Token is not valid' });
//     }
// }
