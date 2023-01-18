const fs = require('fs');
const path = require('path');

const directoryPath = process.argv[2];
const directoryStructure = {};

const createDirectoryStructure = (directory, structure) => {
    const files = fs.readdirSync(directory);
    files.forEach((file) => {
        const filePath = path.join(directory, file);
        const fileStat = fs.lstatSync(filePath);
        if (fileStat.isDirectory()) {
            structure[file] = {};
            createDirectoryStructure(filePath, structure[file]);
        } else {
            structure[file] = null;
        }
    });
};

createDirectoryStructure(directoryPath, directoryStructure);
console.log(directoryStructure);
fs.writeFileSync('directory_structureXYZ.json', JSON.stringify(directoryStructure, null, 2));
