// function to get the names of all the subfolders in a given path
function getCategoryNames(path) {
    // use the node.js file system module to read the contents of the given path
    const fs = require('fs');
    let subfolders = [];
    try {
        const contents = fs.readdirSync(path);
        // iterate through the contents of the path
        for (let i = 0; i < contents.length; i++) {
            // check if the item is a directory
            if (fs.lstatSync(path + '/' + contents[i]).isDirectory()) {
                // if it is a directory, add it to the subfolders array
                subfolders.push(contents[i]);
            }
        }
        return subfolders;
    } catch (error) {
        console.error(error);
    }
}


// function to get the names of all the files in a given path
function getFileNames(path) {
    // use the node.js file system module to read the contents of the given path
    const fs = require('fs');
    let files = [];
    try {
        const contents = fs.readdirSync(path);
        // iterate through the contents of the path
        for (let i = 0; i < contents.length; i++) {
            // check if the item is a file
            if (fs.lstatSync(path + '/' + contents[i]).isFile()) {
                // if it is a file, add it to the files array
                files.push(contents[i]);
            }
        }
        return files;
    } catch (error) {
        console.error(error);
    }
}
