const fs = require("fs");

fs.readFile("a1-web-application-category-names.txt", "utf8", (err, data) => {
    if (err) throw err;
    let lines = data.split("\n");
    let newLines = lines.map((line, index) => {
        if (index === 0) return; // skip first line
        return `Give me a list of all possible model names for  ${line} web application `;
    });
    fs.writeFile("a2instructionsToGetModelNames.txt", newLines.join("\n"), (err) => {
        if (err) throw err;
        console.log("file saved!");
    });
});
