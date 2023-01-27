
const fs = require("fs");
const path = require("path");

function cleanCategoryNames(folderName, fileName) {
    // Create the main folder
    fs.mkdirSync(folderName);
    // Read the contents of the file
    const categories = fs.readFileSync(fileName, "utf8");

    // Split the contents of the file by newline
    const categoryList = categories.split("\n");
    // Iterate through each line of the file
    for (let i = 0; i < categoryList.length; i++) {
        let line = categoryList[i];
        // Remove any whitespace and non-alphanumeric characters
        let cleanLine = line.replace(/[^a-zA-Z0-9 ]/g, "");
        // Replace remaining whitespace with underscores
        cleanLine = cleanLine.replace(/\s+/g, "_");
        // Convert to snake_case
        cleanLine = cleanLine.toLowerCase();
        // Create a new folder with the cleaned line as its name
        const newFolder = path.join(folderName, cleanLine);
        fs.mkdirSync(newFolder);
        console.log(`Folder ${cleanLine} created successfully.`);
        
        // Call the additional functions to create files inside the new folder
        createDotEnv(newFolder);
        createDotIgnore(newFolder);
        createServer(newFolder);
        createAuthServer(newFolder);
    }
}

 
//create .env file function
function createDotEnv(subdirectory) {
    let envContent = `PORT=4000
AUTH_SERVER_PORT=4001
LOCAL_MONGO_URI=mongodb://localhost:27017/myapp
MONGO_URI=mongodb+srv://Admin34:EasyPassword123456@mernapp.lmtcnvm.mongodb.net/testDB
ACCESS_TOKEN_SECRET=myAccessTokenSecret
REFRESH_TOKEN_SECRET=myRefreshTokenSecret
JWT_EXPIRE=3600
JWT_REFRESH_EXPIRE=86400`;
    // Write the .env file
    fs.writeFileSync(path.join(subdirectory, '.env'), envContent);
    console.log(".env file created successfully");
}


//create .gitignore file function
function createDotIgnore(subdirectory) {
    let gitignoreContent = 'node_modules';
    // Write the .gitignore file
    fs.writeFileSync(path.join(subdirectory, '.gitignore'), gitignoreContent);
    console.log(".gitignore file created successfully");
}

 

//create server.js file function
function createServer(subdirectory) {
    let serverContent = `const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
console.log('Server running on port ' + PORT);
});`;
    // Write the server.js file
    fs.writeFileSync(path.join(subdirectory, 'server.js'), serverContent);
    console.log("server.js file created successfully");
  }

function createAuthServer(folderName) {
    fs.writeFileSync(path.join(folderName, "authServer.js"), "// Basic auth server template");
    console.log("authServer.js file created successfully");
}





// Example usage:
const folderName = "my-app";
const fileName = "webAppCategories.txt";
cleanCategoryNames(folderName, fileName);
