const fs = require('fs');
const path = require('path');

const viewStructure = (dir) => {
    let results = {};
    const list = fs.readdirSync(dir);

    list.forEach((file) => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if(file.split(path.sep).pop() !== 'node_modules'){
                results[file] = viewStructure(file);
            }
        } else {
            results.push(file);
        }
    });
    return results;
}

const dir = 'c:\\Users\\Nelzon\\MERN-Web-App-Template\\ai\\backendSocialMedia'
const structure = viewStructure(dir);
console.log(structure);

// Write the directory structure to a JSON file
fs.writeFileSync(`structure.json`, JSON.stringify(structure, null, 4));
