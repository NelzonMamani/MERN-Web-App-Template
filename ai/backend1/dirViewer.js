const fs = require('fs');
const path = require('path');

function viewStructure(dir) {
    const structure = {};
    const queue = [{ dir, level: structure }];

    while (queue.length) {
        const { dir, level } = queue.shift();
        fs.readdirSync(dir)
            .filter(file => !file.startsWith('.') && file !== 'node_modules')
            .forEach(file => {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    const newLevel = {};
                    level[file] = newLevel;
                    queue.push({ dir: filePath, level: newLevel });
                } else {
                    level[file] = null;
                }
            });
    }
    fs.writeFileSync('structure.json', JSON.stringify(structure));
    console.log(structure);
}

viewStructure(`c:\\Users\\Nelzon\\MERN-Web-App-Template\\ai\\backendSocialMedia`);
