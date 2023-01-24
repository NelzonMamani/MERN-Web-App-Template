// Import the LiveStream model
const LiveStream = require('../models/LiveStream');

// Create a new LiveStream
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new LiveStream instance
    const newLiveStream = new LiveStream({
        // add the properties of the LiveStream model here
    });

    // Save the LiveStream in the database
    newLiveStream.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the LiveStream."
        });
    });
};



// Get all LiveStreams
exports.findAll = async (req, res) => {
    try {
        // Find all LiveStreams
        const LiveStreams = await LiveStream.find();

        // Send a JSON response with all LiveStreams
        res.json(LiveStreams);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single LiveStream with a id
exports.findById = (req, res) => {
    LiveStream.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " LiveStream not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " LiveStream not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving LiveStream with id " + req.params.id
        });
    });
};




// Update a LiveStream identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated LiveStream object
    const updatedLiveStream = {};
    if (name) updatedLiveStream.name = name;
    if (email) updatedLiveStream.email = email;
    if (phone) updatedLiveStream.phone = phone;

    try {
        // Find the LiveStream to update by id and update it
        let LiveStream = await LiveStream.findById(req.params.id);
        if (!LiveStream) {
            return res.status(404).json({ msg: 'LiveStream not found' });
        }
        LiveStream = await LiveStream.findByIdAndUpdate(req.params.id, { $set: updatedLiveStream }, { new: true });
        res.json(LiveStream);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a LiveStream identified by the id in the request
exports.delete = async (req, res) {
    try {
        await LiveStream.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted LiveStream' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    