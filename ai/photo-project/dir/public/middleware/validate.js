const Joi = require('@hapi/joi');

// validate the request body before a CRUD operation is performed:
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ msg: error.details[0].message });
        }
        next();
    }
}

module.exports = validate;

// This validate middleware function accepts a schema as an argument, 
// which can be used to specify the validation rules for the request body. 
// It uses the Joi library to validate the request body against the given schema. 
// If the request body is invalid, it sends a 400 Bad Request response with the error message. 
// If the request body is valid, it calls the next middleware in the chain.