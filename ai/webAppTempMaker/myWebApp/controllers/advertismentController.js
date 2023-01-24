// Import the Advertisment model
const Advertisment = require('../models/Advertisment');

// Create a new Advertisment
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new Advertisment instance
    const newAdvertisment = new Advertisment({
        // add the properties of the Advertisment model here
    });

    // Save the Advertisment in the database
    newAdvertisment.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Advertisment."
        });
    });
};



// Get all Advertisments
exports.findAll = async (req, res) => {
    try {
        // Find all Advertisments
        const Advertisments = await Advertisment.find();

        // Send a JSON response with all Advertisments
        res.json(Advertisments);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single Advertisment with a id
exports.findById = (req, res) => {
    Advertisment.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " Advertisment not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " Advertisment not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Advertisment with id " + req.params.id
        });
    });
};




// Update a Advertisment identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated Advertisment object
    const updatedAdvertisment = {};
    if (name) updatedAdvertisment.name = name;
    if (email) updatedAdvertisment.email = email;
    if (phone) updatedAdvertisment.phone = phone;

    try {
        // Find the Advertisment to update by id and update it
        let Advertisment = await Advertisment.findById(req.params.id);
        if (!Advertisment) {
            return res.status(404).json({ msg: 'Advertisment not found' });
        }
        Advertisment = await Advertisment.findByIdAndUpdate(req.params.id, { $set: updatedAdvertisment }, { new: true });
        res.json(Advertisment);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a Advertisment identified by the id in the request
exports.delete = async (req, res) {
    try {
        await Advertisment.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted Advertisment' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    