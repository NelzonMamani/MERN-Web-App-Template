const fs = require('fs');
const express = require('express');

function modelRoutesCRUDMaker(modelName) {
    // Create the router object
    const router = express.Router();

    // Create the controller for the specified model
    const modelController = require(`../controllers/${modelName.toLowerCase()}Controller`);

    // Create route for creating a new model
    router.post(`/`, modelController.create);

    // Create route for getting all models
    router.get(`/`, modelController.findAll);

    // Create route for getting a model by id
    router.get(`/:id`, modelController.findById);

    // Create route for updating a model by id
    router.patch(`/:id`, modelController.update);

    // Create route for deleting a model by id
    router.delete(`/:id`, modelController.delete);

    // Write the router to a file
    fs.writeFileSync(`${modelName.toLowerCase()}Routes.js`, `module.exports = ${router}`);
}

modelRoutesCRUDMaker("User")