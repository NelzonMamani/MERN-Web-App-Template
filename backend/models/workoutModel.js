const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Workout', workoutSchema)

// the Schema defines the structure of a document
// a model uses that structre or Schema 
// model interacts with a collection of Workouts in plural