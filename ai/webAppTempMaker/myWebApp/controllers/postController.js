// Import the Post model
const Post = require('../models/Post');

// Create a new Post
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new Post instance
    const newPost = new Post({
        // add the properties of the Post model here
    });

    // Save the Post in the database
    newPost.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Post."
        });
    });
};



// Get all Posts
exports.findAll = async (req, res) => {
    try {
        // Find all Posts
        const Posts = await Post.find();

        // Send a JSON response with all Posts
        res.json(Posts);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single Post with a id
exports.findById = (req, res) => {
    Post.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " Post not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " Post not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Post with id " + req.params.id
        });
    });
};




// Update a Post identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated Post object
    const updatedPost = {};
    if (name) updatedPost.name = name;
    if (email) updatedPost.email = email;
    if (phone) updatedPost.phone = phone;

    try {
        // Find the Post to update by id and update it
        let Post = await Post.findById(req.params.id);
        if (!Post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        Post = await Post.findByIdAndUpdate(req.params.id, { $set: updatedPost }, { new: true });
        res.json(Post);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a Post identified by the id in the request
exports.delete = async (req, res) {
    try {
        await Post.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted Post' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    