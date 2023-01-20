const net = require('net');
const fs = require('fs');

const file = fs.createWriteStream('./freePortsChecker.txt');

let port = 1;
let count = 0;

while (count < 100) {
  const server = net.createServer().listen(port);

  server.on('listening', () => {
    file.write(`Port ${port} is available\n`);
    count++;
    server.close();
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      // port is already in use
    } else {
      console.log(err);
    }
  });

  port++;
}
