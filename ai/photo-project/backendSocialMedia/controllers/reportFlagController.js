// Import the ReportFlag model
const ReportFlag = require('../models/ReportFlag');

// Create a new ReportFlag
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new ReportFlag instance
    const newReportFlag = new ReportFlag({
        // add the properties of the ReportFlag model here
    });

    // Save the ReportFlag in the database
    newReportFlag.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the ReportFlag."
        });
    });
};



// Get all ReportFlags
exports.findAll = async (req, res) => {
    try {
        // Find all ReportFlags
        const ReportFlags = await ReportFlag.find();

        // Send a JSON response with all ReportFlags
        res.json(ReportFlags);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single ReportFlag with a id
exports.findById = (req, res) => {
    ReportFlag.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " ReportFlag not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " ReportFlag not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving ReportFlag with id " + req.params.id
        });
    });
};




// Update a ReportFlag identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated ReportFlag object
    const updatedReportFlag = {};
    if (name) updatedReportFlag.name = name;
    if (email) updatedReportFlag.email = email;
    if (phone) updatedReportFlag.phone = phone;

    try {
        // Find the ReportFlag to update by id and update it
        let ReportFlag = await ReportFlag.findById(req.params.id);
        if (!ReportFlag) {
            return res.status(404).json({ msg: 'ReportFlag not found' });
        }
        ReportFlag = await ReportFlag.findByIdAndUpdate(req.params.id, { $set: updatedReportFlag }, { new: true });
        res.json(ReportFlag);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a ReportFlag identified by the id in the request
exports.delete = async (req, res) {
    try {
        await ReportFlag.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted ReportFlag' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    