const { createServer } = require('http');
const { Buffer } = require('buffer');
const fs = require('fs')

createServer((req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    req.setEncoding("binary"); // 二进制编码
    let fileBuffer = Buffer.alloc(0);
    req.on('data', (chunk) => {
        console.log('拿到数据');
        fileBuffer = Buffer.concat([fileBuffer, chunk]);
    });
    req.on('end', () => {
        // 解析文件
        console.log('上传完成', fileBuffer);
        // const fileStr = fileBuffer.toString('base64')
        fs.writeFileSync('./test.png', fileBuffer, (err, data) => {
            console.log(err, data)
        })
        res.end('ok');
    });
}).listen(2760, () => {
    console.log('服务开启----');
});
