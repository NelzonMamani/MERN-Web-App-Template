// Import the User model
const User = require('../models/User');

// Create a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new User instance
    const newUser = new User({
        // add the properties of the User model here
    });

    // Save the User in the database
    newUser.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};



// Get all Users
exports.findAll = async (req, res) => {
    try {
        // Find all Users
        const Users = await User.find();

        // Send a JSON response with all Users
        res.json(Users);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single User with a id
exports.findById = (req, res) => {
    User.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " User not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.id
        });
    });
};




// Update a User identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated User object
    const updatedUser = {};
    if (name) updatedUser.name = name;
    if (email) updatedUser.email = email;
    if (phone) updatedUser.phone = phone;

    try {
        // Find the User to update by id and update it
        let User = await User.findById(req.params.id);
        if (!User) {
            return res.status(404).json({ msg: 'User not found' });
        }
        User = await User.findByIdAndUpdate(req.params.id, { $set: updatedUser }, { new: true });
        res.json(User);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a User identified by the id in the request
exports.delete = async (req, res) {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted User' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    