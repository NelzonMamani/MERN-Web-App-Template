// Import the Story model
const Story = require('../models/Story');

// Create a new Story
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new Story instance
    const newStory = new Story({
        // add the properties of the Story model here
    });

    // Save the Story in the database
    newStory.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Story."
        });
    });
};



// Get all Storys
exports.findAll = async (req, res) => {
    try {
        // Find all Storys
        const Storys = await Story.find();

        // Send a JSON response with all Storys
        res.json(Storys);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single Story with a id
exports.findById = (req, res) => {
    Story.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " Story not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " Story not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Story with id " + req.params.id
        });
    });
};




// Update a Story identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated Story object
    const updatedStory = {};
    if (name) updatedStory.name = name;
    if (email) updatedStory.email = email;
    if (phone) updatedStory.phone = phone;

    try {
        // Find the Story to update by id and update it
        let Story = await Story.findById(req.params.id);
        if (!Story) {
            return res.status(404).json({ msg: 'Story not found' });
        }
        Story = await Story.findByIdAndUpdate(req.params.id, { $set: updatedStory }, { new: true });
        res.json(Story);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a Story identified by the id in the request
exports.delete = async (req, res) {
    try {
        await Story.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted Story' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    