const User = require('../models/User');

// exports an object containing all the user-related functions
module.exports = {
    // function to create a new user
    async create(req, res) {
        try {
            // create a new user using the data from the request body
            const user = new User(req.body);
            // save the user to the database
            await user.save();
            // send a 201 Created status and the user data
            res.status(201).json({ user });
        } catch (error) {
            // if there's an error, send a 500 Internal Server Error status and the error message
            res.status(500).json({ msg: error.message });
        }
    },
    // function to get all users
    async findAll(req, res) {
        try {
            // find all users in the database
            const users = await User.find();
            // send a 200 OK status and the users data
            res.json({ users });
        } catch (error) {
            // if there's an error, send a 500 Internal Server Error status and the error message
            res.status(500).json({ msg: error.message });
        }
    },
    // function to get a single user by id
    async findById(req, res) {
        try {
            // find the user by id in the database
            const user = await User.findById(req.params.id);
            // if no user is found, send a 404 Not Found status
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }
            // send a 200 OK status and the user data
            res.json({ user });
        } catch (error) {
            // if there's an error, send a 500 Internal Server Error status and the error message
            res.status(500).json({ msg: error.message });
        }
    },
    // function to update a user by id
    async update(req, res) {
        try {
            // find and update the user by id in the database
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            // if no user is found, send a 404 Not Found status
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }
            // send a 200 OK status and the updated user data
            res.json({ user });
        } catch (error) {
            // if there's an error, send a 500 Internal Server Error status and the error message
            res.status(500).json({ msg: error.message });
        }
        },
        // function to delete a user by id
        async delete(req, res) {
            try {
                // find and delete the user by id in the database
                const user = await User.findByIdAndDelete(req.params.id);
                // if no user is found, send a 404 Not Found status
                if (!user) {
                    return res.status(404).json({ msg: 'User not found' });
                }
                // send a 200 OK status and a message indicating that the user was deleted
                res.json({ msg: 'User deleted' });
            } catch (error) {
                // if there's an error, send a 500 Internal Server Error status and the error message
                res.status(500).json({ msg: error.message });
            }
        }
    };
    