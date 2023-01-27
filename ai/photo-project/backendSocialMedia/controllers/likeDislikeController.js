// Import the LikeDislike model
const LikeDislike = require('../models/LikeDislike');

// Create a new LikeDislike
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new LikeDislike instance
    const newLikeDislike = new LikeDislike({
        // add the properties of the LikeDislike model here
    });

    // Save the LikeDislike in the database
    newLikeDislike.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the LikeDislike."
        });
    });
};



// Get all LikeDislikes
exports.findAll = async (req, res) => {
    try {
        // Find all LikeDislikes
        const LikeDislikes = await LikeDislike.find();

        // Send a JSON response with all LikeDislikes
        res.json(LikeDislikes);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single LikeDislike with a id
exports.findById = (req, res) => {
    LikeDislike.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " LikeDislike not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " LikeDislike not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving LikeDislike with id " + req.params.id
        });
    });
};




// Update a LikeDislike identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated LikeDislike object
    const updatedLikeDislike = {};
    if (name) updatedLikeDislike.name = name;
    if (email) updatedLikeDislike.email = email;
    if (phone) updatedLikeDislike.phone = phone;

    try {
        // Find the LikeDislike to update by id and update it
        let LikeDislike = await LikeDislike.findById(req.params.id);
        if (!LikeDislike) {
            return res.status(404).json({ msg: 'LikeDislike not found' });
        }
        LikeDislike = await LikeDislike.findByIdAndUpdate(req.params.id, { $set: updatedLikeDislike }, { new: true });
        res.json(LikeDislike);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a LikeDislike identified by the id in the request
exports.delete = async (req, res) {
    try {
        await LikeDislike.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted LikeDislike' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    