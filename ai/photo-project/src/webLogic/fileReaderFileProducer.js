const fs = require('fs')

function ToUpperCamelCase(fileName) {
  fs.readFile(fileName, "utf8", function (err, data) {
    if (err) throw err;
    var lines = data.split("\n");
    for (var i = 0; i < lines.length; i++) {
      lines[i] = lines[i]
        .split(" ")
        .map((x) => x[0].toUpperCase() + x.slice(1))
        .join("");
    }
    var newData = lines.join("\n");
    fs.writeFile("UpperCamelCase" + fileName, newData, "utf8", function (err) {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  });
}

function toLowerCamelCase(fileName) {
  fs.readFile(fileName, "utf8", function (err, data) {
    if (err) throw err;
    var lines = data.split("\n");
    for (var i = 0; i < lines.length; i++) {
      lines[i] = lines[i][0].toLowerCase() + lines[i].slice(1);
    }
    var newData = lines.join("\n");
    fs.writeFile("lowerCamelCase" + fileName, newData, "utf8", function (err) {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  });
}

function to_snake_case(fileName) {
  fs.readFile(fileName, "utf8", function (err, data) {
    if (err) throw err;
    var lines = data.split("\n");
    for (var i = 0; i < lines.length; i++) {
      lines[i] = lines[i].split(" ").join("").toLowerCase();
    }
    var newData = lines.join("\n");
    fs.writeFile("snake_case" + fileName, newData, "utf8", function (err) {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  });
}
function toModelName(fileName) {
  fs.readFile(fileName, "utf8", function (err, data) {
    if (err) throw err;
    var lines = data.split("\n");
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].split(" ");
      var newLine = "";
      for (var j = 0; j < line.length; j++) {
        newLine += line[j][0].toUpperCase() + line[j].slice(1);
      }
      lines[i] = newLine;
    }
    var newData = lines.join("\n");
    fs.writeFile("singularModelNameList.txt", newData, "utf8", function (err) {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  });
}

ToUpperCamelCase(list.txt)
toLowerCamelCase(list.txt)
to_snake_case(list.txt)
toModelName(list.txt)
