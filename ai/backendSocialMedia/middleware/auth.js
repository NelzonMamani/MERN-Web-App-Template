const authenticate = require('./authenticate');
const authorize = require('./authorize');

module.exports = {
    authenticate,
    authorize
}

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
