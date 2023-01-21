const fs = require("fs");
//const inflection = require('inflection');
const natural = require("natural");
const stemmer = natural.PorterStemmer;
const inflection = require("inflection");
const path = require("path");

// Function to convert file to UpperCamelCase naming convention
function ToUpperCamelCase(fileName) {
  fs.readFile(fileName, "utf8", function (err, data) {
    if (err) throw err;
    var lines = data.split("\n");
    lines.shift(); // remove first line
    for (var i = 0; i < lines.length; i++) {
      lines[i] = lines[i].trim().replace(/[^a-zA-Z0-9 ]/g, ""); // remove whitespaces and weird characters
      lines[i] = inflection.singularize(lines[i]);
      lines[i] = lines[i].replace(/\s+/g, "");
      lines[i] = inflection.camelize(lines[i]);
      lines[i] = lines[i].charAt(0).toUpperCase() + lines[i].slice(1);
    }
    // var newData = lines.join("\n");
    // fs.writeFile("UpperCamelCaseList.txt", newData, 'utf8', function(err) {
    //     if (err) throw err;
    //     console.log("The file has been saved!");
    // });
    var newData = lines.join("\n");
    const folderPath = path.join(__dirname, "backend-web-app");
    fs.mkdirSync(folderPath, { recursive: true });
    const filePath = path.join(folderPath, "UpperCamelCaseList.txt");
    fs.writeFileSync(filePath, newData, "utf8");
    console.log("The file has been saved!");
  });
}

// Function to convert file to lowerCamelCase naming convention
function toLowerCamelCase(fileName) {
  fs.readFile(fileName, "utf8", function (err, data) {
    if (err) throw err;
    var lines = data.split("\n");
    lines.shift(); // remove first line
    for (var i = 0; i < lines.length; i++) {
      lines[i] = lines[i].trim().replace(/[^a-zA-Z0-9 ]/g, ""); // remove whitespaces and weird characters
      lines[i] = inflection.singularize(lines[i]);
      lines[i] = lines[i].replace(/\s+/g, "");
      lines[i] = inflection.camelize(lines[i], false);
      lines[i] = lines[i].charAt(0).toLowerCase() + lines[i].slice(1);
    }
    // var newData = lines.join("\n");
    // fs.writeFile("lowerCamelCaseList.txt", newData, 'utf8', function(err) {
    //     if (err) throw err;
    //     console.log("The file has been saved!");
    // });
    var newData = lines.join("\n");
    const folderPath = path.join(__dirname, "backend-web-app");
    fs.mkdirSync(folderPath, { recursive: true });
    const filePath = path.join(folderPath, "lowerCamelCaseList.txt");
    fs.writeFileSync(filePath, newData, "utf8");
    console.log("The file has been saved!");
  });
}

function to_snake_case(fileName) {
  fs.readFile(fileName, "utf8", function (err, data) {
    if (err) throw err;
    var lines = data.split("\n");
    lines.shift(); // remove first line
    for (var i = 0; i < lines.length; i++) {
      lines[i] = lines[i].trim().replace(/[^a-zA-Z0-9 ]/g, ""); // remove whitespaces and weird characters
      lines[i] = inflection.singularize(lines[i]);
      lines[i] = lines[i].replace(/\s+/g, "_"); // replace whitespaces with underscore
      lines[i] = lines[i].toLowerCase(); // convert the whole word to lowercase
    }
    // var newData = lines.join("\n");
    // fs.writeFile("snake_case_list.txt", newData, 'utf8', function(err) {
    //     if (err) throw err;
    //     console.log("The file has been saved!");
    // });
    var newData = lines.join("\n");
    const folderPath = path.join(__dirname, "backend-web-app");
    fs.mkdirSync(folderPath, { recursive: true });
    const filePath = path.join(folderPath, "snake_case_list.txt");
    fs.writeFileSync(filePath, newData, "utf8");
    console.log("The file has been saved!");
  });
}

//const inflection = require('inflection');

// function toModelName(fileName) {
//     fs.readFile(fileName, 'utf8', function(err, data) {
//         if (err) throw err;
//         var lines = data.split("\n");
//         lines.shift(); // remove first line
//         for (var i = 0; i < lines.length; i++) {
//             lines[i] = lines[i].trim().replace(/[^a-zA-Z0-9 ]/g, ""); // remove whitespaces and weird characters
//             lines[i] = inflection.singularize(lines[i]);
//         }
//         var newData = lines.join("\n");
//         fs.writeFile("singularModelNameList.txt", newData, 'utf8', function(err) {
//             if (err) throw err;
//             console.log("The file has been saved!");
//         });
//     });
// }

function toModelName(fileName) {
  fs.readFile(fileName, "utf8", function (err, data) {
    if (err) throw err;
    var lines = data.split("\n");
    lines.shift(); // remove first line
    for (var i = 0; i < lines.length; i++) {
      lines[i] = lines[i].trim().replace(/[^a-zA-Z0-9 ]/g, ""); // remove whitespaces and weird characters
      lines[i] = inflection.singularize(lines[i]);
      lines[i] = lines[i].replace(/\s+/g, "");
      lines[i] = inflection.camelize(lines[i]);
      lines[i] = lines[i].charAt(0).toUpperCase() + lines[i].slice(1);
    }
    // var newData = lines.join("\n");
    // fs.writeFile("singularModelNameList.txt", newData, 'utf8', function(err) {
    //     if (err) throw err;
    //     console.log("The file has been saved!");
    // });
    var newData = lines.join("\n");
    const folderPath = path.join(__dirname, "backend-web-app");
    fs.mkdirSync(folderPath, { recursive: true });
    const filePath = path.join(folderPath, "singularModelNameList.txt");
    fs.writeFileSync(filePath, newData, "utf8");
    console.log("The file has been saved!");
  });
}

function to_snake_case_folders(fileName) {
  fs.readFile(fileName, "utf8", function (err, data) {
    if (err) throw err;
    var lines = data.split("\n");
    lines.shift(); // remove first line
    for (var i = 0; i < lines.length; i++) {
      lines[i] = lines[i].trim().replace(/[^a-zA-Z0-9 ]/g, ""); // remove whitespaces and weird characters
      lines[i] = inflection.singularize(lines[i]);
      lines[i] = lines[i].replace(/\s+/g, "_");
      lines[i] = lines[i].toLowerCase();
    }
    const folderPath = path.join(__dirname, "backend-web-app");
    fs.mkdirSync(folderPath, { recursive: true });
    for (var i = 0; i < lines.length; i++) {
      const dirPath = path.join(folderPath, lines[i]);
      fs.mkdirSync(dirPath);
    }
    console.log("The directories have been created!");
  });
}

// function fileMaker(fileName) {
//     fs.readFile(fileName, 'utf8', function(err, data) {
//         if (err) throw err;
//         var lines = data.split("\n");
//         lines.shift(); // remove first line
//         fs.mkdirSync(`${__dirname}/backend-web-app/controllers`);
//         for (var i = 0; i < lines.length; i++) {
//             lines[i] = lines[i].trim().replace(/[^a-zA-Z0-9 ]/g, ""); // remove whitespaces and weird characters
//             lines[i] = inflection.singularize(lines[i]);
//             lines[i] = lines[i].replace(/\s+/g, "");
//             lines[i] = lines[i].charAt(0).toLowerCase() + lines[i].slice(1) + "Controller.js";
//             const filePath = path.join(__dirname, 'backend-web-app', 'controllers', lines[i]);
//             fs.writeFileSync(filePath, '');
//         }
//         console.log("The files have been created!");
//     });
// }


function testsFilesGenerator(fileName) {
    fs.readFile(fileName, 'utf8', function(err, data) {
        if (err) throw err;
        var lines = data.split("\n");
        lines.shift(); // remove first line
        fs.mkdirSync(`${__dirname}/backend-web-app/tests`);
        for (var i = 0; i < lines.length; i++) {
            lines[i] = lines[i].trim().replace(/[^a-zA-Z0-9 ]/g, ""); // remove whitespaces and weird characters
            lines[i] = inflection.singularize(lines[i]);
            lines[i] = lines[i].replace(/\s+/g, "");
            lines[i] = lines[i].charAt(0).toLowerCase() + lines[i].slice(1) +"Routes."+ "tests.js";
            const filePath = path.join(__dirname, 'backend-web-app', 'tests', lines[i]);
            fs.writeFileSync(filePath, '');
        }
        console.log("The files have been created!");
    });
}



function modelsHandlersFilesGenerator(fileName) {
    fs.readFile(fileName, 'utf8', function(err, data) {
        if (err) throw err;
        var lines = data.split("\n");
        lines.shift(); // remove first line
        fs.mkdirSync(`${__dirname}/backend-web-app/models`);
        for (var i = 0; i < lines.length; i++) {
            lines[i] = lines[i].trim().replace(/[^a-zA-Z0-9 ]/g, ""); // remove whitespaces and weird characters
            lines[i] = inflection.singularize(lines[i]);
            lines[i] = lines[i].replace(/\s+/g, "");
            lines[i] = lines[i].charAt(0).toUpperCase() + lines[i].slice(1) + ".js";
            const filePath = path.join(__dirname, 'backend-web-app', 'models', lines[i]);
            fs.writeFileSync(filePath, '');
        }
        console.log("The files have been created!");
    });
}



function routesHandlersFilesGenerator(fileName) {
    fs.readFile(fileName, 'utf8', function(err, data) {
        if (err) throw err;
        var lines = data.split("\n");
        lines.shift(); // remove first line
        fs.mkdirSync(`${__dirname}/backend-web-app/routes`);
        for (var i = 0; i < lines.length; i++) {
            lines[i] = lines[i].trim().replace(/[^a-zA-Z0-9 ]/g, ""); // remove whitespaces and weird characters
            lines[i] = inflection.singularize(lines[i]);
            lines[i] = lines[i].replace(/\s+/g, "");
            lines[i] = lines[i].charAt(0).toLowerCase() + lines[i].slice(1) + "Routes.js";
            const filePath = path.join(__dirname, 'backend-web-app', 'routes', lines[i]);
            fs.writeFileSync(filePath, '');
        }
        console.log("The files have been created!");
    });
}


function controllersHandlerFilesGenerator(fileName) {
    fs.readFile(fileName, 'utf8', function(err, data) {
        if (err) throw err;
        var lines = data.split("\n");
        lines.shift(); // remove first line
        fs.mkdirSync(`${__dirname}/backend-web-app/controllers`);
        for (var i = 0; i < lines.length; i++) {
            lines[i] = lines[i].trim().replace(/[^a-zA-Z0-9 ]/g, ""); // remove whitespaces and weird characters
            lines[i] = inflection.singularize(lines[i]);
            lines[i] = lines[i].replace(/\s+/g, "");
            lines[i] = lines[i].charAt(0).toLowerCase() + lines[i].slice(1) + "Controller.js";
            const filePath = path.join(__dirname, 'backend-web-app', 'controllers', lines[i]);
            fs.writeFileSync(filePath, '');
        }
        console.log("The files have been created!");
    });
}
 

toModelName("list.txt");
ToUpperCamelCase("list.txt");
toLowerCamelCase("list.txt");
to_snake_case("list.txt");
//fileMaker("list.txt");
modelsHandlersFilesGenerator("list.txt");
routesHandlersFilesGenerator("list.txt");
controllersHandlerFilesGenerator("list.txt");
testsFilesGenerator("list.txt");


//to_snake_case_folders("list.txt");
//this makes folders out of Names in the list.txt
