// Import the Event model
const Event = require('../models/Event');

// Create a new Event
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new Event instance
    const newEvent = new Event({
        // add the properties of the Event model here
    });

    // Save the Event in the database
    newEvent.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Event."
        });
    });
};



// Get all Events
exports.findAll = async (req, res) => {
    try {
        // Find all Events
        const Events = await Event.find();

        // Send a JSON response with all Events
        res.json(Events);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single Event with a id
exports.findById = (req, res) => {
    Event.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " Event not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " Event not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Event with id " + req.params.id
        });
    });
};




// Update a Event identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated Event object
    const updatedEvent = {};
    if (name) updatedEvent.name = name;
    if (email) updatedEvent.email = email;
    if (phone) updatedEvent.phone = phone;

    try {
        // Find the Event to update by id and update it
        let Event = await Event.findById(req.params.id);
        if (!Event) {
            return res.status(404).json({ msg: 'Event not found' });
        }
        Event = await Event.findByIdAndUpdate(req.params.id, { $set: updatedEvent }, { new: true });
        res.json(Event);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a Event identified by the id in the request
exports.delete = async (req, res) {
    try {
        await Event.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted Event' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    