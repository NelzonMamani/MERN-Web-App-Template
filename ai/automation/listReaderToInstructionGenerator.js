const fs = require('fs');

fs.readFile('a1-web-application-category-names.txt', 'utf8', (err, data) => {
  if (err) throw err;
  let lines = data.split('\n');
  let output = "";
  for (let i = 1; i < lines.length; i++) {
    output += "Give me list of all possible models for a " + lines[i] +" web application. We'll use the MERN aproach and start working on the backend " + '\n';
  }
  fs.writeFile('a2instructionsToGetModels.txt', output, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});
