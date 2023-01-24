const fs = require("fs");
const path = require("path");

function treeGenerator(dir) {
    // Function to generate the tree-like output
    function generateTreeOutput(dir, spacing = "") {
        let output = "";

        // Read the contents of the directory
        let files;
        try {
            files = fs.readdirSync(dir);
        } catch (err) {
            console.error("Error reading directory:", err);
            return;
        }

        // Loop through the files in the directory
        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            // Get the full path of the file
            let filePath = path.join(dir, file);

            // Check if the file is a directory
            if (fs.lstatSync(filePath).isDirectory()) {
                // Add the directory name to the output with a "+" sign
                output += spacing + "+-- " + file + "\n";

                // Recursively call the function for the directory
                output += generateTreeOutput(filePath, spacing + "    ");
            } else {
                // Add the file name to the output
                output += spacing + "|-- " + file + "\n";
            }
        }

        return output;
    }

    // Generate the tree-like output
    let output = generateTreeOutput(dir, "");

    // Get the root folder name to be printed at the top 
    let root = path.basename(path.dirname(dir));
    console.log("\n" + root + " is the root directory" + "\n")
    console.log(output);

    // Write the output to a file
    const fileName = "projectTreeStructure.txt";
    fs.writeFile(fileName, output, (err) => {
        if (err) {
            console.error("Error writing to file:", err);
        } else {
            console.log("Tree output written to " + fileName);
        }
    });
}

// Usage example
treeGenerator("c:\\Users\\Nelzon\\MERN-Web-App-Template\\ai\\photo-project\\dir");
