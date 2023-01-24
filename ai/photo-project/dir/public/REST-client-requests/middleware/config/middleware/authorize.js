const User = require('../models/User');

// exports a function that takes in an array of roles as a parameter
module.exports = (roles = []) => {
    // the function returns an async middleware that takes in the request, response, and next object
    return async (req, res, next) => {
        //find the user by the id in the request object
        const user = await User.findById(req.user.id);
        //check if the roles of the user includes one of the roles passed to the middleware
        //and check if the user's status is set to active
        if (!roles.includes(user.roles) || user.status !== 'active') {
            //if either of the above conditions are not met, return a 401 Unauthorized status
            return res.status(401).json({ msg: 'Unauthorized' });
        }
        //if the user has the required role and status, call the next middleware
        next();
    }
}


// module.exports = (roles = []) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(401).json({ msg: 'Unauthorized' });
//         }
//         next();
//     }
// }

// module.exports = (roles = []) => {
//     return async (req, res, next) => {
//         const user = await User.findById(req.user.id);
//         if (!roles.includes(user.roles) || user.status !== 'active') {
//             return res.status(401).json({ msg: 'Unauthorized' });
//         }
//         next();
//     }
// }
