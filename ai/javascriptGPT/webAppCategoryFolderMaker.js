const fs = require('fs');
const path = require('path');

function cleanCategoryNames(folderName, fileName) {
  // Create the main folder
  fs.mkdirSync(folderName);

  // Read the contents of the file
  let fileContent = fs.readFileSync(fileName, 'utf8');

  // Split the file content into an array of lines
  let lines = fileContent.split('\n');

  // Loop through the lines
  for (let i = 0; i < lines.length; i++) {
    // Remove any whitespace and non-alphanumeric characters
    let cleanedLine = lines[i].replace(/[^a-zA-Z0-9 ]/g, '');
    // Replacing remaining whitespace with underscores
    cleanedLine = cleanedLine.replace(/\s+/g, '_');
    // apply snake_case naming convention
    cleanedLine = cleanedLine.toLowerCase();
    // Create a folder with the cleaned line name
    fs.mkdirSync(path.join(folderName, cleanedLine));
  }
}

// call the function
cleanCategoryNames("webAppCategories","webAppCategoryList.txt")