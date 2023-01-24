// Import the GroupCommunity model
const GroupCommunity = require('../models/GroupCommunity');

// Create a new GroupCommunity
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new GroupCommunity instance
    const newGroupCommunity = new GroupCommunity({
        // add the properties of the GroupCommunity model here
    });

    // Save the GroupCommunity in the database
    newGroupCommunity.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the GroupCommunity."
        });
    });
};



// Get all GroupCommunitys
exports.findAll = async (req, res) => {
    try {
        // Find all GroupCommunitys
        const GroupCommunitys = await GroupCommunity.find();

        // Send a JSON response with all GroupCommunitys
        res.json(GroupCommunitys);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single GroupCommunity with a id
exports.findById = (req, res) => {
    GroupCommunity.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " GroupCommunity not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " GroupCommunity not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving GroupCommunity with id " + req.params.id
        });
    });
};




// Update a GroupCommunity identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated GroupCommunity object
    const updatedGroupCommunity = {};
    if (name) updatedGroupCommunity.name = name;
    if (email) updatedGroupCommunity.email = email;
    if (phone) updatedGroupCommunity.phone = phone;

    try {
        // Find the GroupCommunity to update by id and update it
        let GroupCommunity = await GroupCommunity.findById(req.params.id);
        if (!GroupCommunity) {
            return res.status(404).json({ msg: 'GroupCommunity not found' });
        }
        GroupCommunity = await GroupCommunity.findByIdAndUpdate(req.params.id, { $set: updatedGroupCommunity }, { new: true });
        res.json(GroupCommunity);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a GroupCommunity identified by the id in the request
exports.delete = async (req, res) {
    try {
        await GroupCommunity.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted GroupCommunity' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    