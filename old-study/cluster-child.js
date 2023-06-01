/*
 * @Date: 2022-04-07 07:45:27
 * @LastEditors: jimouspeng
 * @Description: 集群启动子进程代码
 * @LastEditTime: 2022-04-07 07:54:50
 * @FilePath: \node\cluster-child.js
 */

const http = require('http')

http.createServer((req, res) => {
    res.setHeader('Content-type', 'text/html;charset=UTF-8')
    res.end('当前id' + process.pid, 'utf8')
}).listen(8080, () => {
    console.log(process.pid, '服务已启动')
})
