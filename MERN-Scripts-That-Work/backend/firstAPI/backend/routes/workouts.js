const express = require("express")
const router = express.Router()
const {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')

// Read all workouts
router.get("/", getWorkouts)

// Read a single workout
router.get("/:id", getWorkout)

// Create a new workout
router.post("/", createWorkout)

// Delete a workout
router.delete("/:id", deleteWorkout)

// Update a workout
router.patch("/:id", updateWorkout)

module.exports = router