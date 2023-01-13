const express = require('express');
const router = express.Router();
const User = require('../models/user');
// jsonwebtoken library (jwt) in the auth.js file 
// to generate JSON Web Tokens (JWT) for the user when they log in
// These tokens can be used to authenticate the user on subsequent requests to the server.
const jwt = require('jsonwebtoken');

const {verifyToken, authorize} = require('../config/middleware');
router.get('/admin', verifyToken, authorize, (req, res) => {
    res.send('Protected Route');
});


router.post('/register', (req, res) => {
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name
    });
    newUser.save((err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(user);
        }
    });
});

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else if (!user) {
            res.status(404).send('user not found');
        } else {
            if (user.verifyPassword(req.body.password)) {
                let token = jwt.sign({
                    id: user._id,
                    email: user.email
                }, 'secret_key', { expiresIn: '1h' });
                res.status(200).send({ token });
            } else {
                res.status(401).send('unauthorized');
            }
        }
    });
});



module.exports = router;




