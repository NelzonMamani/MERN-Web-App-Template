const fs = require('fs');
const path = require('path');

function createFileList(dir) {
    // read all files in directory
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error("Error reading directory:", err);
            return;
        }
        // create an array to store the new file names without extensions
        let fileNamesWithoutExt = [];
        // iterate over each file
        files.forEach(file => {
            // get the file name without the extension
            let fileNameWithoutExt = path.parse(file).name;
            // add the file name to the array
            fileNamesWithoutExt.push(fileNameWithoutExt);
        });
        // write the array of file names to the list.txt file
        fs.writeFile("list.txt", fileNamesWithoutExt.join("\n"), (err) => {
            if (err) {
                console.error("Error writing to file:", err);
                return;
            }
            console.log("File list created successfully!");
        });
    });
}

// usage
createFileList("c:\\mp3");