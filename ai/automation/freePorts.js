const net = require('net');
const fs = require('fs');

const file = fs.createWriteStream('freePorts.txt');

let port = 0;
let count = 0;

const server = net.createServer();
server.on('listening', () => {
    const address = server.address();
    file.write(`Port ${address.port} is available\n`);
    count++;
    if (count < 100) {
        port++;
        server.close();
        server.listen(port);
    } else {
        server.close();
        file.end();
        console.log('Finished writing to file');
    }
});

server.on('error', (err) => {
    port++;
    server.listen(port);
});

server.listen(port);
