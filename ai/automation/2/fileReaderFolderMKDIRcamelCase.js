const fs = require('fs');
// reads a1-web-application-category-names.txt and converts each line into a folder inside web-projects-2023
fs.readFile('a1-web-application-category-names.txt', 'utf8', (err, data) => {
  if (err) throw err;

  // Split the file into an array of lines
  const lines = data.split('\n');

  // Iterate over each line
  lines.forEach(line => {
    // Replace spaces with dashes and convert to lower case
    const folderName = line.toLowerCase().replace(/\s/g, '-');
    // Create the directory
    fs.mkdir(`web-projects2023/${folderName}`, { recursive: true }, err => {
      if (err) throw err;
      console.log(`Directory ${folderName} created.`);
    });
  });
});
