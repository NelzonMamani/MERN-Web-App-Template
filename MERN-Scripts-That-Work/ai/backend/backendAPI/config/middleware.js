const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).send('Access Denied');
    }
    try {
        const verified = jwt.verify(token, 'secret_key');
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}

const authorize = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(401).send('Access Denied');
    }
    next();
}

module.exports = {verifyToken, authorize};
