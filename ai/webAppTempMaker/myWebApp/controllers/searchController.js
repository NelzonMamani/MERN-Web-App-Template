// Import the Search model
const Search = require('../models/Search');

// Create a new Search
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new Search instance
    const newSearch = new Search({
        // add the properties of the Search model here
    });

    // Save the Search in the database
    newSearch.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Search."
        });
    });
};



// Get all Searchs
exports.findAll = async (req, res) => {
    try {
        // Find all Searchs
        const Searchs = await Search.find();

        // Send a JSON response with all Searchs
        res.json(Searchs);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single Search with a id
exports.findById = (req, res) => {
    Search.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " Search not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " Search not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Search with id " + req.params.id
        });
    });
};




// Update a Search identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated Search object
    const updatedSearch = {};
    if (name) updatedSearch.name = name;
    if (email) updatedSearch.email = email;
    if (phone) updatedSearch.phone = phone;

    try {
        // Find the Search to update by id and update it
        let Search = await Search.findById(req.params.id);
        if (!Search) {
            return res.status(404).json({ msg: 'Search not found' });
        }
        Search = await Search.findByIdAndUpdate(req.params.id, { $set: updatedSearch }, { new: true });
        res.json(Search);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a Search identified by the id in the request
exports.delete = async (req, res) {
    try {
        await Search.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted Search' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    