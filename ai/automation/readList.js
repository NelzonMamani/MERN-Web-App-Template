// const fs = require('fs');

// fs.readFile('list.txt', 'utf8', (err, data) => {
//     if (err) throw err;
//     let endpoints = data.split('\n');
//     console.log(endpoints);
// });

const fs = require('fs');

let output = [];

fs.readFile('list.txt', 'utf8', (err, data) => {
    if (err) throw err;
    output = data.split('\n');
    console.log(output);
});