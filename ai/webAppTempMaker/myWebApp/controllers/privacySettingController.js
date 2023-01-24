// Import the PrivacySetting model
const PrivacySetting = require('../models/PrivacySetting');

// Create a new PrivacySetting
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new PrivacySetting instance
    const newPrivacySetting = new PrivacySetting({
        // add the properties of the PrivacySetting model here
    });

    // Save the PrivacySetting in the database
    newPrivacySetting.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the PrivacySetting."
        });
    });
};



// Get all PrivacySettings
exports.findAll = async (req, res) => {
    try {
        // Find all PrivacySettings
        const PrivacySettings = await PrivacySetting.find();

        // Send a JSON response with all PrivacySettings
        res.json(PrivacySettings);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single PrivacySetting with a id
exports.findById = (req, res) => {
    PrivacySetting.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " PrivacySetting not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " PrivacySetting not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving PrivacySetting with id " + req.params.id
        });
    });
};




// Update a PrivacySetting identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated PrivacySetting object
    const updatedPrivacySetting = {};
    if (name) updatedPrivacySetting.name = name;
    if (email) updatedPrivacySetting.email = email;
    if (phone) updatedPrivacySetting.phone = phone;

    try {
        // Find the PrivacySetting to update by id and update it
        let PrivacySetting = await PrivacySetting.findById(req.params.id);
        if (!PrivacySetting) {
            return res.status(404).json({ msg: 'PrivacySetting not found' });
        }
        PrivacySetting = await PrivacySetting.findByIdAndUpdate(req.params.id, { $set: updatedPrivacySetting }, { new: true });
        res.json(PrivacySetting);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a PrivacySetting identified by the id in the request
exports.delete = async (req, res) {
    try {
        await PrivacySetting.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted PrivacySetting' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    