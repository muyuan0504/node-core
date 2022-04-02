/*
 * @Author: jimouspeng
 * @Date: 2022-04-02 14:32:47
 * @Description: 另起一个端口给http-server.js请求
 * @FilePath: \node\http-server2.js
 */

const { createServer } = require('http');

createServer((req, res) => {
    const { headers, method } = req;
    if (method === 'POST') {
        console.log(req);
    }
    console.log(headers, '看看请求头');
    res.end('9527--get');
}).listen(9527, () => {
    console.log('9527 start-------');
});
