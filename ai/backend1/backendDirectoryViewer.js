const fs = require('fs');
const path = require('path');

const viewStructure = (dir) => {
    let results = {}
    let files = fs.readdirSync(dir, { withFileTypes: true });
    files.forEach(file => {
        if (file.isDirectory() && file.name !== 'node_modules') {
            results[file.name] = viewStructure(path.join(dir, file.name));
        } else {
            if (file.name !== 'node_modules') {
                results[file.name] = '';
            }
        }
    });
    let json = JSON.stringify(results, null, 2);
    console.log(json);
    
    fs.writeFileSync('directoryStructure.json', JSON.stringify(json, null, 2));

};

viewStructure(`c:\\Users\\Nelzon\\MERN-Web-App-Template\\ai\\backendSocialMedia`);
