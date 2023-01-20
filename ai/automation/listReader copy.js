const fs = require('fs');

let lines = [];
fs.readFile('a1-web-application-category-names.txt', 'utf8', (err, data) => {
    if (err) throw err;
    lines = data.split('\n');
    console.log(lines);
});


// Skip the first item in the array
const names =  lines.slice(1); 
   
//Using map
//const instructions = names.map(name => `Give me a list of all possible endpoints for a ${name} model`);

// // // Using forEach
const instructions = [];
names.forEach(name => instructions.push(`Give me a list of all possible endpoints for a ${name} model`));

// Writing to file 
fs.writeFileSync('instructionsOutput2.txt', instructions.join('\n'));
console.log(`Instructions written to file`)
