// Import the Notification model
const Notification = require('../models/Notification');

// Create a new Notification
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new Notification instance
    const newNotification = new Notification({
        // add the properties of the Notification model here
    });

    // Save the Notification in the database
    newNotification.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Notification."
        });
    });
};



// Get all Notifications
exports.findAll = async (req, res) => {
    try {
        // Find all Notifications
        const Notifications = await Notification.find();

        // Send a JSON response with all Notifications
        res.json(Notifications);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single Notification with a id
exports.findById = (req, res) => {
    Notification.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " Notification not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " Notification not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Notification with id " + req.params.id
        });
    });
};




// Update a Notification identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated Notification object
    const updatedNotification = {};
    if (name) updatedNotification.name = name;
    if (email) updatedNotification.email = email;
    if (phone) updatedNotification.phone = phone;

    try {
        // Find the Notification to update by id and update it
        let Notification = await Notification.findById(req.params.id);
        if (!Notification) {
            return res.status(404).json({ msg: 'Notification not found' });
        }
        Notification = await Notification.findByIdAndUpdate(req.params.id, { $set: updatedNotification }, { new: true });
        res.json(Notification);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a Notification identified by the id in the request
exports.delete = async (req, res) {
    try {
        await Notification.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted Notification' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    