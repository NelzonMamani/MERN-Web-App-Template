// Import the Comment model
const Comment = require('../models/Comment');

// Create a new Comment
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new Comment instance
    const newComment = new Comment({
        // add the properties of the Comment model here
    });

    // Save the Comment in the database
    newComment.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Comment."
        });
    });
};



// Get all Comments
exports.findAll = async (req, res) => {
    try {
        // Find all Comments
        const Comments = await Comment.find();

        // Send a JSON response with all Comments
        res.json(Comments);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single Comment with a id
exports.findById = (req, res) => {
    Comment.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " Comment not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " Comment not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Comment with id " + req.params.id
        });
    });
};




// Update a Comment identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated Comment object
    const updatedComment = {};
    if (name) updatedComment.name = name;
    if (email) updatedComment.email = email;
    if (phone) updatedComment.phone = phone;

    try {
        // Find the Comment to update by id and update it
        let Comment = await Comment.findById(req.params.id);
        if (!Comment) {
            return res.status(404).json({ msg: 'Comment not found' });
        }
        Comment = await Comment.findByIdAndUpdate(req.params.id, { $set: updatedComment }, { new: true });
        res.json(Comment);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a Comment identified by the id in the request
exports.delete = async (req, res) {
    try {
        await Comment.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted Comment' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    