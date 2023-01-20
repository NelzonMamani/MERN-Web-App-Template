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
    
    //str = str.substring(0, str.length - 1);   

    // Create the directory
    fs.mkdir(`web-projects-2023/${folderName.substring(0,folderName.length-1)}`, { recursive: true }, err => {
      if (err) throw err;
      console.log(`Directory ${folderName} created.`);
    });
  });
});
