const http = require('http');

const httpCtx = http.createServer((req, res) => {
    if (req.url.indexOf('/favicon.ico') > -1) {
        // 网站icon响应拦截
        res.end();
        return;
    }
    /** 协商缓存服务端处理 */
    console.log(req.headers['if-none-match']);
    if (req.headers['if-none-match']) {
        /** 资源未变更，http状态码返回304 */
        res.writeHead(304, {
            'Content-Type': 'application/json;charset=utf-8',
            'Last-Modified': new Date().getTime(),
        });
        // 直接结束响应，不需要返回具体值
        res.end();
        return;
    } else {
        /** 强制缓存配置 */
        res.writeHead(200, {
            'Content-Type': 'application/json;charset=utf-8',
            /** 强制缓存响应
             * Expires字段，值为绝对时间
             */
            // Expires: new Date('2023-01-01').toUTCString(),
            // 'Cache-Control': 'only-if-cached',
            Etag: 'jimous_is_cool',
        });
        res.end('jimous is cool~~');
    }
    console.log('请求打到服务器❤');
    return;
});

httpCtx.listen(9001, () => {
    console.log('服务开启');
});
