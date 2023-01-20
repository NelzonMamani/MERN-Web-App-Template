const title= ""
const names = ["John", "Emily", "Jessica"];
 // Using map
//const instructions = names.map(name => `Give me a list of all possible endpoints for a ${name} model`);

  

// // Using forEach
const instructions = [];
names.forEach(name => instructions.push(`Give me a list of all possible endpoints for a ${name} model`));

// Writing to file
const fs = require('fs');
fs.writeFileSync('instructionsOutput.txt', instructions.join('\n'));
console.log(`Instructions written to file`)
