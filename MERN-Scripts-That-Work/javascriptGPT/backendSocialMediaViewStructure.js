const fs = require('fs');

function viewStructure(dir) {
    fs.readdirSync(dir).forEach(file => {
        if (file === '.node_modules') return;
        const filepath = `${dir}/${file}`;
        const stats = fs.lstatSync(filepath);
        if (stats.isDirectory()) {
            console.log(`directory: ${filepath}`);
            viewStructure(filepath);
        } else {
            console.log(`file: ${filepath}`);
        }
    });
}

viewStructure('c:\\Users\\Nelzon\\MERN-Web-App-Template\\ai\\backendSocialMedia');
