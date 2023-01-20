const fs = require('fs');

fs.readFile('a1-web-application-category-names.txt', 'utf8', (err, data) => {
  if (err) throw err;

  const lines = data.split('\n');
  // Skip the first line
  lines.shift();

  // Use forEach to add text to each line
  lines.forEach((line, index) => {
    lines[index] = `Give me a list of all possible model names for  ${line} web application`;
  });

  // Write to output file
  fs.writeFile('a2-getModelNamesInstructions7777777.txt', lines.join('\n'), (err) => {
    if (err) throw err;
    console.log('File saved successfully!');
  });
});
