// Import the PhotoVideo model
const PhotoVideo = require('../models/PhotoVideo');

// Create a new PhotoVideo
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new PhotoVideo instance
    const newPhotoVideo = new PhotoVideo({
        // add the properties of the PhotoVideo model here
    });

    // Save the PhotoVideo in the database
    newPhotoVideo.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the PhotoVideo."
        });
    });
};



// Get all PhotoVideos
exports.findAll = async (req, res) => {
    try {
        // Find all PhotoVideos
        const PhotoVideos = await PhotoVideo.find();

        // Send a JSON response with all PhotoVideos
        res.json(PhotoVideos);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single PhotoVideo with a id
exports.findById = (req, res) => {
    PhotoVideo.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " PhotoVideo not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " PhotoVideo not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving PhotoVideo with id " + req.params.id
        });
    });
};




// Update a PhotoVideo identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated PhotoVideo object
    const updatedPhotoVideo = {};
    if (name) updatedPhotoVideo.name = name;
    if (email) updatedPhotoVideo.email = email;
    if (phone) updatedPhotoVideo.phone = phone;

    try {
        // Find the PhotoVideo to update by id and update it
        let PhotoVideo = await PhotoVideo.findById(req.params.id);
        if (!PhotoVideo) {
            return res.status(404).json({ msg: 'PhotoVideo not found' });
        }
        PhotoVideo = await PhotoVideo.findByIdAndUpdate(req.params.id, { $set: updatedPhotoVideo }, { new: true });
        res.json(PhotoVideo);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a PhotoVideo identified by the id in the request
exports.delete = async (req, res) {
    try {
        await PhotoVideo.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted PhotoVideo' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    