/** 强缓存 & 协商缓存 本地测试 */
const http = require('http');

let init = false;

const httpCtx = http.createServer((req, res) => {
    if (req.url.indexOf('/favicon.ico') > -1) {
        res.end();
        return;
    }
    console.log(req.headers);
    if (new Date().getTime() - Number(req.headers['if-modified-since']) < 8 * 1000) {
        init = true;
        console.log('进缓存了');
        res.writeHead(304, {
            'Content-Type': 'application/json;charset=utf-8',
            'Last-Modified': new Date().getTime(),
        });
        res.end('111');
        return;
    }
    // res.setHeader('Expires', new Date(Date.now() + 20000).toGMTString());
    // res.setHeader('Cache-Control', 'max-age=60');
    res.writeHead(200, {
        'content-Type': 'application/json;charset=utf-8',
        Expires: new Date('2022-08-19').toGMTString(),
        // 'Cache-Control': 'max-age=60000',
        // Etag: '1212',
        'Last-Modified': new Date().getTime(),
    });
    const data = init ? '缓存刷新-----' : 'jimous is cool 2132323';
    res.end(data);
});

httpCtx.listen(8000, () => {
    console.log('服务器开启');
});
