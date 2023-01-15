// Require the File System module
const fs = require('fs');

// Read the file
fs.readFile('path/to/file.txt', 'utf-8', (err, data) => {
  if (err) throw err;

  // Do something with the data
  // ...

  // Write the file
  fs.writeFile('path/to/file.txt', data, (err) => {
    if (err) throw err;
  });
});

// Delete the file
fs.unlink('path/to/file.txt', (err) => {
  if (err) throw err;
});