const fs = require('fs');
const path = require('path');

fs.readFile('a1-web-application-category-names.txt', 'utf-8', (err, data) => {
  if (err) throw err;

  // Split the file into an array of lines
  const lines = data.split('\n');

  // Iterate over each line
  lines.forEach((line) => {
    // Remove whitespaces
    const noWhitespace = line.replace(/\s/g, '');
    // camelCase the line
    const camelCased = noWhitespace.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
    // Create new folder
    const newFolder = path.join(__dirname, 'web-projects-2023', camelCased);
    fs.mkdir(newFolder, { recursive: true }, (err) => {
      if (err) throw err;
      console.log(`Folder ${newFolder} created`);
    });
  });
});
