// Import the Analytic model
const Analytic = require('../models/Analytic');

// Create a new Analytic
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new Analytic instance
    const newAnalytic = new Analytic({
        // add the properties of the Analytic model here
    });

    // Save the Analytic in the database
    newAnalytic.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Analytic."
        });
    });
};



// Get all Analytics
exports.findAll = async (req, res) => {
    try {
        // Find all Analytics
        const Analytics = await Analytic.find();

        // Send a JSON response with all Analytics
        res.json(Analytics);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single Analytic with a id
exports.findById = (req, res) => {
    Analytic.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " Analytic not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " Analytic not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Analytic with id " + req.params.id
        });
    });
};




// Update a Analytic identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated Analytic object
    const updatedAnalytic = {};
    if (name) updatedAnalytic.name = name;
    if (email) updatedAnalytic.email = email;
    if (phone) updatedAnalytic.phone = phone;

    try {
        // Find the Analytic to update by id and update it
        let Analytic = await Analytic.findById(req.params.id);
        if (!Analytic) {
            return res.status(404).json({ msg: 'Analytic not found' });
        }
        Analytic = await Analytic.findByIdAndUpdate(req.params.id, { $set: updatedAnalytic }, { new: true });
        res.json(Analytic);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a Analytic identified by the id in the request
exports.delete = async (req, res) {
    try {
        await Analytic.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted Analytic' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    