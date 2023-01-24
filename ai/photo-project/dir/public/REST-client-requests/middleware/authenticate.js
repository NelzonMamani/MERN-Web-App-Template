const jwt = require('jsonwebtoken');
const User = require('../models/User');

// this middleware function will check if the client is sending a valid token in the headers
module.exports = async (req, res, next) => {
    try {
        // get the token from the headers
        const token = req.headers.authorization.split(" ")[1];
        // get the token type from the headers
        const tokenType = req.headers.authorization.split(" ")[0];

        // check if the token is an access token or a refresh token
        let decoded;
        if (tokenType === 'Bearer') {
            // verify the token using ACCESS_TOKEN_SECRET from .env file
            decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } else if (tokenType === 'Refresh') {
            // verify the token using REFRESH_TOKEN_SECRET from .env file
            decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        } else {
            return res.status(401).json({ msg: 'Invalid token type' });
        }

        // find the user using the userId from the payload
        const user = await User.findById(decoded.userId);

        // if the user not found, return 401 unauthorized
        if (!user) {
            return res.status(401).json({ msg: 'User not found' });
        }
        // attach the user to the request object
        req.user = user;
        // call the next middleware
        next();
    } catch (err) {
        // if the token is not valid, return 401 unauthorized
        return res.status(401).json({ msg: 'Token is not valid' });
    }
}
