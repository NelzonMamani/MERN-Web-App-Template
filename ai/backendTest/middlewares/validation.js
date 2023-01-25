const { check, validationResult } = require('express-validator');

// middleware function for validating user data before creating a new user
exports.validateUserData = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    check('email')
        .isEmail()
        .withMessage('Email is required'),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Password is required'),
    check('role')
        .not()
        .isEmpty()
        .withMessage('Role is required'),
    check('status')
        .not()
        .isEmpty()
        .withMessage('Status is required'),
    // handling validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Error validating user data',
                errors: errors.array()
            });
        }
        next();
    }
];
