// const fs = require('fs');

// fs.readFile('list.txt', 'utf8', (err, data) => {
//     if (err) throw err;
//     let endpoints = data.split('\n');
//     console.log(endpoints);
// });

const fs = require('fs');

let lines = [];

fs.readFile('a1-web-application-category-names.txt', 'utf8', (err, data) => {
    if (err) throw err;
    lines = data.split('\n');
    console.log(lines);
});