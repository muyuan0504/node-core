/*
 * @Author: jimouspeng
 * @Date: 2022-04-27 14:21:06
 * @Description: 中间件
 * @FilePath: \node\connect.js
 */

const connect = require('connect');

const app = connect();

let flagText = 'origin';

app.use((req, res, next) => {
    console.log('请求入口');
    next();
});

app.use(function (req, res, next) {
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

app.use(function (req, res) {
    console.log('还是进来了？');
    /** charset=utf-8: 解决中文乱码 */
    res.writeHead(200, {
        'Content-Type': 'text/html;charset=utf-8',
    });
    res.end(`<h1>拿到请求${flagText}</h1>`);
    flagText = 'origin';
});

// proto.listen = function listen() {
//     var server = http.createServer(this);
//     return server.listen.apply(server, arguments);
// };
app.listen(3000, () => {
    console.log('service open--');
});
