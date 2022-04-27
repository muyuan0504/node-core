/*
 * @Author: jimouspeng
 * @Date: 2022-04-27 14:21:06
 * @Description: 中间件
 * @FilePath: \node\connect.js
 */

const connect = require('connect');

const server = connect();

let flagText = 'origin';

server.use((req, res, next) => {
    console.log('请求入口');
    next();
});

server.use(function (req, res, next) {
    console.log(req.headers.cookie);
    if (/favicon.ico/.test(req.url)) {
        // 过滤掉图标请求
        next();
        return;
    }
    if (req.url === '/index') {
        flagText = 'change';
    }
    next();
});

server.use(function (req, res) {
    console.log('还是进来了？');
    /** charset=utf-8: 解决中文乱码 */
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8',
    });
    res.end(`<h1>拿到请求${flagText}</h1>`);
    flagText = 'origin';
});

server.listen(3000, () => {
    console.log('service open--');
});
