const fs = require("fs");
const path = require("path");
const inflection = require("inflection");
//const modelRoutesCRUDMaker = require('./modelRoutesCRUDMaker')

function SetAppName(webAppName) {
  // Creates a folder for the web app
  if (!fs.existsSync(`${__dirname}/${webAppName}`)) {
    fs.mkdirSync(`${__dirname}/${webAppName}`);
    console.log(`${webAppName} directory created`);
  }
}

function controllersHandlersFilesGenerator(webAppName, listTxt) {
  fs.readFile(listTxt, "utf8", function (err, data) {
    if (err) throw err;
    var lines = data.split("\n");
    lines.shift(); // remove first line
    fs.mkdirSync(`${__dirname}/${webAppName}/controllers`);
    for (var i = 0; i < lines.length; i++) {
      lines[i] = lines[i].trim().replace(/[^a-zA-Z0-9 ]/g, ""); // remove whitespaces and weird characters
      lines[i] = inflection.singularize(lines[i]);
      lines[i] = lines[i].replace(/\s+/g, "");
      const fileName = lines[i].charAt(0).toLowerCase() + lines[i].slice(1); // change file name to lower case first character
      lines[i] = lines[i].charAt(0).toUpperCase() + lines[i].slice(1);
      const filePath = path.join(
        __dirname,
        webAppName,
        "controllers",
        fileName + "Controller.js"
      );
      fs.writeFileSync(filePath, modelControllersCRUDMaker(lines[i]));
    }
    console.log("The files have been created!");
  });
}

function testsFilesGenerator(webAppName, listTxt) {
    fs.readFile(listTxt, "utf8", function (err, data) {
      if (err) throw err;
      var lines = data.split("\n");
      lines.shift(); // remove first line
      fs.mkdirSync(`${__dirname}/${webAppName}/tests`);
      for (var i = 0; i < lines.length; i++) {
        lines[i] = lines[i].trim().replace(/[^a-zA-Z0-9 ]/g, ""); // remove whitespaces and weird characters
        lines[i] = inflection.singularize(lines[i]);
        lines[i] = lines[i].replace(/\s+/g, "");
        const fileName = lines[i].charAt(0).toLowerCase() + lines[i].slice(1); // change file name to lower case first character
        lines[i] = lines[i].charAt(0).toUpperCase() + lines[i].slice(1);
        const filePath = path.join(__dirname,webAppName,"tests",
          fileName +"Routes." +"test.js"
        );
        fs.writeFileSync(filePath, modelTestsCRUDMaker(lines[i]));
      }
      console.log("The files have been created!");
    });
  }
   
function routesHandlersFilesGenerator(webAppName, listTxt) {
  fs.readFile(listTxt, "utf8", function (err, data) {
    if (err) throw err;
    var lines = data.split("\n");
    lines.shift(); // remove first line
    fs.mkdirSync(`${__dirname}/${webAppName}/routes`);
    for (var i = 0; i < lines.length; i++) {
      lines[i] = lines[i].trim().replace(/[^a-zA-Z0-9 ]/g, ""); // remove whitespaces and weird characters
      lines[i] = inflection.singularize(lines[i]);
      lines[i] = lines[i].replace(/\s+/g, "");
      lines[i] = lines[i].charAt(0).toLowerCase() + lines[i].slice(1);
      const filePath = path.join(
        __dirname,
        webAppName,
        "routes",
        lines[i] + "Routes.js"
      );
      fs.writeFileSync(filePath, modelRoutesCRUDMaker(lines[i]));
    }
    console.log("The files have been created!");
  });
}

function webAppTemplateMaker(webAppName, listFile) {
  SetAppName(webAppName);
  routesHandlersFilesGenerator(webAppName, listFile);
  controllersHandlersFilesGenerator(webAppName, listFile);
  testsFilesGenerator(webAppName, listFile);

  console.log("Web app template generation complete!");
}

function modelRoutesCRUDMaker(modelName) {
  let crudTemplate = `const express = require('express');
const ${modelName}Controller = require('../controllers/${modelName}Controller');
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

function modelTestsCRUDMaker(modelName) {
    let testsTemplate = `// Import necessary modules
const request = require('supertest');
const { ${modelName} } = require('../models');
const { app } = require('../app');

// Define CRUD operation tests for ${modelName}

// Test creating a new ${modelName}
describe('POST /${modelName}', () => {
    it('should create a new ${modelName}', async () => {
        // Create a new ${modelName}
        const ${modelName}Data = { /* ${modelName} data */ };
        const res = await request(app)
            .post('/${modelName}')
            .send(${modelName}Data);

        // Check for successful response
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject(${modelName}Data);

        // Check that the ${modelName} was saved to the database
        const ${modelName}InDb = await ${modelName}.findById(res.body._id);
        expect(${modelName}InDb).toMatchObject(${modelName}Data);
    });
});

// In-progress...
`;
    return testsTemplate;
}
 

// function modelTestsCRUDMaker(modelName) {
//     let crudTemplate = `const express = require('express');
// const ${modelName}Controller = require('../controllers/${modelName}Controller');
// const router = express.Router();

// // Route to create a new ${modelName}
// router.post('/', ${modelName}Controller.create);

// // Route to get all ${modelName}s
// router.get('/', ${modelName}Controller.findAll);

// // Route to get a ${modelName} by id
// router.get('/:id', ${modelName}Controller.findById);

// // Route to update a ${modelName} by id
// router.patch('/:id', ${modelName}Controller.update);

// // Route to delete a ${modelName} by id
// router.delete('/:id', ${modelName}Controller.delete);

// module.exports = router;

//   `;
//     return crudTemplate;
//   }
  

function modelControllersCRUDMaker(modelName) {
  // Part 1: Create a new ${modelName}
  let createTemplate = `// Import the ${modelName} model
const ${modelName} = require('../models/${modelName}');

// Create a new ${modelName}
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Request body cannot be empty"
        });
    }

    // Create a new ${modelName} instance
    const new${modelName} = new ${modelName}({
        // add the properties of the ${modelName} model here
    });

    // Save the ${modelName} in the database
    new${modelName}.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the ${modelName}."
        });
    });
};



// Get all ${modelName}s
exports.findAll = async (req, res) => {
    try {
        // Find all ${modelName}s
        const ${modelName}s = await ${modelName}.find();

        // Send a JSON response with all ${modelName}s
        res.json(${modelName}s);
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Find a single ${modelName} with a id
exports.findById = (req, res) => {
    ${modelName}.findById(req.params.id)
    .then(data => {
        if(!data) {
            return res.status(404).send({
                message: " ${modelName} not found with id " + req.params.id
            });            
        }
        res.send(data);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " ${modelName} not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving ${modelName} with id " + req.params.id
        });
    });
};




// Update a ${modelName} identified by the id in the request
exports.update = async (req, res) => {
    // Get validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the fields to update from the request body
    const { name, email, phone } = req.body;

    // Build the updated ${modelName} object
    const updated${modelName} = {};
    if (name) updated${modelName}.name = name;
    if (email) updated${modelName}.email = email;
    if (phone) updated${modelName}.phone = phone;

    try {
        // Find the ${modelName} to update by id and update it
        let ${modelName} = await ${modelName}.findById(req.params.id);
        if (!${modelName}) {
            return res.status(404).json({ msg: '${modelName} not found' });
        }
        ${modelName} = await ${modelName}.findByIdAndUpdate(req.params.id, { $set: updated${modelName} }, { new: true });
        res.json(${modelName});
    } catch (err) {
        // Send a JSON response with the error
        console.error(err.message);
        res.status(500).send('Server error');
    }
};




// Delete a ${modelName} identified by the id in the request
exports.delete = async (req, res) {
    try {
        await ${modelName}.findByIdAndRemove(req.params.id);
        res.json({ message: 'Deleted ${modelName}' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

    
    `;
  return createTemplate;
}

webAppTemplateMaker("myWebApp", "list2.txt");
