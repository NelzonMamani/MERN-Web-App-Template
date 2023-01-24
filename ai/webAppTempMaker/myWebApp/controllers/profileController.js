// Import the Profile model
const Profile = require('../models/Profile');

// Create a new Profile
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new Profile instance
    const newProfile = new Profile({
        // add the properties of the Profile model here
    });

    // Save the Profile in the database
    newProfile.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Profile."
        });
    });
};



// Get all Profiles
exports.findAll = async (req, res) => {
    try {
        // Find all Profiles
        const Profiles = await Profile.find();

        // Send a JSON response with all Profiles
        res.json(Profiles);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single Profile with a id
exports.findById = (req, res) => {
    Profile.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " Profile not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " Profile not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Profile with id " + req.params.id
        });
    });
};




// Update a Profile identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated Profile object
    const updatedProfile = {};
    if (name) updatedProfile.name = name;
    if (email) updatedProfile.email = email;
    if (phone) updatedProfile.phone = phone;

    try {
        // Find the Profile to update by id and update it
        let Profile = await Profile.findById(req.params.id);
        if (!Profile) {
            return res.status(404).json({ msg: 'Profile not found' });
        }
        Profile = await Profile.findByIdAndUpdate(req.params.id, { $set: updatedProfile }, { new: true });
        res.json(Profile);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a Profile identified by the id in the request
exports.delete = async (req, res) {
    try {
        await Profile.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted Profile' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    