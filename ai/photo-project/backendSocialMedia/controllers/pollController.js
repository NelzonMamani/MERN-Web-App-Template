// Import the Poll model
const Poll = require('../models/Poll');

// Create a new Poll
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new Poll instance
    const newPoll = new Poll({
        // add the properties of the Poll model here
    });

    // Save the Poll in the database
    newPoll.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Poll."
        });
    });
};



// Get all Polls
exports.findAll = async (req, res) => {
    try {
        // Find all Polls
        const Polls = await Poll.find();

        // Send a JSON response with all Polls
        res.json(Polls);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single Poll with a id
exports.findById = (req, res) => {
    Poll.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " Poll not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " Poll not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Poll with id " + req.params.id
        });
    });
};




// Update a Poll identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated Poll object
    const updatedPoll = {};
    if (name) updatedPoll.name = name;
    if (email) updatedPoll.email = email;
    if (phone) updatedPoll.phone = phone;

    try {
        // Find the Poll to update by id and update it
        let Poll = await Poll.findById(req.params.id);
        if (!Poll) {
            return res.status(404).json({ msg: 'Poll not found' });
        }
        Poll = await Poll.findByIdAndUpdate(req.params.id, { $set: updatedPoll }, { new: true });
        res.json(Poll);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a Poll identified by the id in the request
exports.delete = async (req, res) {
    try {
        await Poll.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted Poll' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    