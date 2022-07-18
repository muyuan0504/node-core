const http = require('http');

const httpCtx = http.createServer((req, res) => {
    if (req.url.indexOf('/favicon.ico') > -1) {
        res.end();
        return;
    }
    console.log(req.headers);
    // res.setHeader('Expires', new Date(Date.now() + 20000).toGMTString());
    // res.setHeader('Cache-Control', 'max-age=60');
    res.writeHead(200, {
        'content-Type': 'application/json',
        Expires: new Date('2022-07-19').toGMTString(),
        // 'Cache-Control': 'max-age=60000',
        // 'Last-Modified': 60 * 2,
    });
    res.end('jimous is cool 2132323');
});

httpCtx.listen(8000, () => {
    console.log('服务器开启');
});
