// Import the Message model
const Message = require('../models/Message');

// Create a new Message
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new Message instance
    const newMessage = new Message({
        // add the properties of the Message model here
    });

    // Save the Message in the database
    newMessage.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Message."
        });
    });
};



// Get all Messages
exports.findAll = async (req, res) => {
    try {
        // Find all Messages
        const Messages = await Message.find();

        // Send a JSON response with all Messages
        res.json(Messages);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single Message with a id
exports.findById = (req, res) => {
    Message.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " Message not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " Message not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Message with id " + req.params.id
        });
    });
};




// Update a Message identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated Message object
    const updatedMessage = {};
    if (name) updatedMessage.name = name;
    if (email) updatedMessage.email = email;
    if (phone) updatedMessage.phone = phone;

    try {
        // Find the Message to update by id and update it
        let Message = await Message.findById(req.params.id);
        if (!Message) {
            return res.status(404).json({ msg: 'Message not found' });
        }
        Message = await Message.findByIdAndUpdate(req.params.id, { $set: updatedMessage }, { new: true });
        res.json(Message);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a Message identified by the id in the request
exports.delete = async (req, res) {
    try {
        await Message.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted Message' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    