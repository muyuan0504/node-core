/*
 * @Author: jimouspeng
 * @Date: 2022-04-02 14:32:47
 * @Description: 另起一个端口给http-server.js请求
 * @FilePath: \node\http-server2.js
 */

const { createServer } = require('http');

createServer((req, res) => {
    req.on('close', (msg) => {
        console.log('服务端底层连接已关闭', msg); // msg undefined
    });
    const { headers, method, complete, httpVersion, url, statusCode, statusMessage } = req;
    console.log('headers: ', headers);
    console.log('method: ', method);
    console.log('complete: ', complete);
    console.log('httpVersion: ', httpVersion);
    console.log('url: ', url);
    console.log('statusCode: ', statusCode); // null
    console.log('statusMessage: ', statusMessage); // null
    if (method === 'POST') {
        console.log(req);
    }
    console.log(headers, '看看请求头');
    res.end('9527--get');
}).listen(9527, () => {
    console.log('9527 start-------');
});
