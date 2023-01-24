const fs = require('fs');
const path = require('path');

  
function treeGenerator(dirPath, level = 0) {
    // Initialize an empty list to store the tree structure
    let tree = [];
    // Iterate through all subdirectories and files in the given path
    fs.readdirSync(dirPath).forEach(file => {
        // Get the current file's full path
        const filePath = path.join(dirPath, file);
        // Get the current file's stats
        const stats = fs.lstatSync(filePath);
        // Get the current file's name
        const name = path.basename(filePath);
        // Check if the current file is a directory
        if (stats.isDirectory()) {
            // Add the current directory to the tree structure
            tree.push(`${'  '.repeat(level * 3)}└── ${name}/`);
            // Recursively call the tree generator function for the current directory
            tree = tree.concat(treeGenerator(filePath, level + 1));
        } else {
            // Add the current file to the tree structure
            tree.push(`${'  '.repeat(level * 3)}└── ${name}`);
        }
    });
    // Write the tree structure to a file
    fs.writeFileSync('treeStructure.txt', tree.join('\n'));
    // Print the tree structure to the console
    console.log(tree.join('\n'));
    return tree;
}



treeGenerator(`c:\\Users\\Nelzon\\MERN-Web-App-Template\\ai\\photo-project\\dir`);
