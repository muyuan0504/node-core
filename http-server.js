const { createServer } = require('http');

const server = createServer((req, res) => {
    console.log(req.writable, res.writable); // undefined, true
    res.writeHead(200, { 'content-Type': 'application/json', 'sleft-content': 'jimous-server' });
    res.end('jimous server' + JSON.stringify(req.headers));
});

server.listen(8000, () => {
    console.log('server start----');
});
