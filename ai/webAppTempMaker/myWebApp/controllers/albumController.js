// Import the Album model
const Album = require('../models/Album');

// Create a new Album
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new Album instance
    const newAlbum = new Album({
        // add the properties of the Album model here
    });

    // Save the Album in the database
    newAlbum.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Album."
        });
    });
};



// Get all Albums
exports.findAll = async (req, res) => {
    try {
        // Find all Albums
        const Albums = await Album.find();

        // Send a JSON response with all Albums
        res.json(Albums);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single Album with a id
exports.findById = (req, res) => {
    Album.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " Album not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " Album not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Album with id " + req.params.id
        });
    });
};




// Update a Album identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated Album object
    const updatedAlbum = {};
    if (name) updatedAlbum.name = name;
    if (email) updatedAlbum.email = email;
    if (phone) updatedAlbum.phone = phone;

    try {
        // Find the Album to update by id and update it
        let Album = await Album.findById(req.params.id);
        if (!Album) {
            return res.status(404).json({ msg: 'Album not found' });
        }
        Album = await Album.findByIdAndUpdate(req.params.id, { $set: updatedAlbum }, { new: true });
        res.json(Album);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a Album identified by the id in the request
exports.delete = async (req, res) {
    try {
        await Album.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted Album' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    