// Import the Location model
const Location = require('../models/Location');

// Create a new Location
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new Location instance
    const newLocation = new Location({
        // add the properties of the Location model here
    });

    // Save the Location in the database
    newLocation.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Location."
        });
    });
};



// Get all Locations
exports.findAll = async (req, res) => {
    try {
        // Find all Locations
        const Locations = await Location.find();

        // Send a JSON response with all Locations
        res.json(Locations);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single Location with a id
exports.findById = (req, res) => {
    Location.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " Location not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " Location not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Location with id " + req.params.id
        });
    });
};




// Update a Location identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated Location object
    const updatedLocation = {};
    if (name) updatedLocation.name = name;
    if (email) updatedLocation.email = email;
    if (phone) updatedLocation.phone = phone;

    try {
        // Find the Location to update by id and update it
        let Location = await Location.findById(req.params.id);
        if (!Location) {
            return res.status(404).json({ msg: 'Location not found' });
        }
        Location = await Location.findByIdAndUpdate(req.params.id, { $set: updatedLocation }, { new: true });
        res.json(Location);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a Location identified by the id in the request
exports.delete = async (req, res) {
    try {
        await Location.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted Location' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    