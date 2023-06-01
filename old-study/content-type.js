const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
    // res.setHeader('content-type', 'text/plain') // 纯文本格式
    // res.setHeader('content-type', 'text/html') // HTML格式
    // res.end('<h1>jimous is cool</h1>')
    // res.setHeader('content-type', 'application/json')
    // res.end(JSON.stringify({ a: 1 }))
    res.setHeader('content-type', 'image/jpg')
    const readStream = fs.createReadStream('./image/jimous.jpg')
    readStream.pipe(res)
}).listen(8000, () => {
    console.log('服务运行中', process.pid)
})
