const http = require('http');
http.createServer((req, res) => {
    console.log('====================================');
    console.log(req);
    console.log('====================================');
    setTimeout(() => {
        res.writeHead(200, 'ok');
        res.end('ok');
    }, 10000000);
}).listen(8000, () => {
    console.log('服务启动');
});
