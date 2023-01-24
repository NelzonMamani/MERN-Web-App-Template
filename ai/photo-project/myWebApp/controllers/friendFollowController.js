// Import the FriendFollow model
const FriendFollow = require('../models/FriendFollow');

// Create a new FriendFollow
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new FriendFollow instance
    const newFriendFollow = new FriendFollow({
        // add the properties of the FriendFollow model here
    });

    // Save the FriendFollow in the database
    newFriendFollow.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the FriendFollow."
        });
    });
};



// Get all FriendFollows
exports.findAll = async (req, res) => {
    try {
        // Find all FriendFollows
        const FriendFollows = await FriendFollow.find();

        // Send a JSON response with all FriendFollows
        res.json(FriendFollows);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single FriendFollow with a id
exports.findById = (req, res) => {
    FriendFollow.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " FriendFollow not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " FriendFollow not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving FriendFollow with id " + req.params.id
        });
    });
};




// Update a FriendFollow identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated FriendFollow object
    const updatedFriendFollow = {};
    if (name) updatedFriendFollow.name = name;
    if (email) updatedFriendFollow.email = email;
    if (phone) updatedFriendFollow.phone = phone;

    try {
        // Find the FriendFollow to update by id and update it
        let FriendFollow = await FriendFollow.findById(req.params.id);
        if (!FriendFollow) {
            return res.status(404).json({ msg: 'FriendFollow not found' });
        }
        FriendFollow = await FriendFollow.findByIdAndUpdate(req.params.id, { $set: updatedFriendFollow }, { new: true });
        res.json(FriendFollow);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a FriendFollow identified by the id in the request
exports.delete = async (req, res) {
    try {
        await FriendFollow.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted FriendFollow' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    