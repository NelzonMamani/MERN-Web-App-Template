


function modelRoutesCRUDMaker(modelName, webAppName) {
    let crudTemplate = `const express = require('express');
    const ${modelName}Controller = require('../${webAppName}/controllers/${modelName}Controller');
    const router = express.Router();
    
    // Route to create a new ${modelName}
    router.post('/', ${modelName}Controller.create);
    
    // Route to get all ${modelName}s
    router.get('/', ${modelName}Controller.findAll);
    
    // Route to get a ${modelName} by id
    router.get('/:id', ${modelName}Controller.findById);
    
    // Route to update a ${modelName} by id
    router.patch('/:id', ${modelName}Controller.update);
    
    // Route to delete a ${modelName} by id
    router.delete('/:id', ${modelName}Controller.delete);
    
    module.exports = router;`;
    return crudTemplate;
}
