// Import the Hashtag model
const Hashtag = require('../models/Hashtag');

// Create a new Hashtag
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new Hashtag instance
    const newHashtag = new Hashtag({
        // add the properties of the Hashtag model here
    });

    // Save the Hashtag in the database
    newHashtag.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Hashtag."
        });
    });
};



// Get all Hashtags
exports.findAll = async (req, res) => {
    try {
        // Find all Hashtags
        const Hashtags = await Hashtag.find();

        // Send a JSON response with all Hashtags
        res.json(Hashtags);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single Hashtag with a id
exports.findById = (req, res) => {
    Hashtag.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " Hashtag not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " Hashtag not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Hashtag with id " + req.params.id
        });
    });
};




// Update a Hashtag identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated Hashtag object
    const updatedHashtag = {};
    if (name) updatedHashtag.name = name;
    if (email) updatedHashtag.email = email;
    if (phone) updatedHashtag.phone = phone;

    try {
        // Find the Hashtag to update by id and update it
        let Hashtag = await Hashtag.findById(req.params.id);
        if (!Hashtag) {
            return res.status(404).json({ msg: 'Hashtag not found' });
        }
        Hashtag = await Hashtag.findByIdAndUpdate(req.params.id, { $set: updatedHashtag }, { new: true });
        res.json(Hashtag);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a Hashtag identified by the id in the request
exports.delete = async (req, res) {
    try {
        await Hashtag.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted Hashtag' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    