const { createServer } = require('http')
const { Buffer } = require('buffer')
const fs = require('fs')

createServer((req, res) => {
    // console.log(req, '看看请求方法', req.file)
    res.writeHeader(200)
    let fileBuf = Buffer.alloc(0)
    const writeStream = fs.createWriteStream('./picinfo.txt')
    const writeStream2 = fs.createWriteStream('./picinfo2.txt')
    const writeStream3 = fs.createWriteStream('./picinfo3.txt')
    req.on('data', (chunk) => {
        // console.log('接收数据: ', chunk, typeof chunk)
        fileBuf = Buffer.concat([fileBuf, chunk])
    })
    req.on('end', () => {
        var rems = []
        //根据\r\n分离数据和报头
        for (var i = 0; i < fileBuf.length; i++) {
            var v = fileBuf[i]
            var v2 = fileBuf[i + 1]
            /** ascii码判断  chr(10) 换行 chr(13) 回车 Chr(13)&chr(10) 回车换行 */
            if (v == 13 && v2 == 10) {
                rems.push(i)
            }
        }
        /** 拿到图片信息, rems[0]+2是处理掉换行占用的字节位 */
        var picInfo = fileBuf.slice(rems[0] + 2, rems[1]).toString()
        const picByte = fileBuf.slice(rems[3]+2, rems[4])
        console.log(picInfo.match(/filename=".*"/g)[0].split('"')[1], '打印后缀');
        writeStream.write(picByte)
        writeStream2.write(picInfo)
        writeStream3.write(fileBuf)
        fs.writeFileSync('./picinfo.jpg', picByte)
        console.log(fileBuf.slice(rems[0] + 2, rems[1]).toString().length, '-------', fileBuf.slice(rems[0], rems[1]).toString().length)
        res.end(fileBuf.slice(rems[0], rems[1]).toString())
        // let baseSix = fileBuf.toString('base64')
        // let newFileBuf = Buffer.from(baseSix, 'base64')
        // console.log(Buffer.compare(newFileBuf, fileBuf))
        // fs.writeFileSync('./newFile.jpg', newFileBuf, (err, data) => {
        //     console.log(err, data, '数据写入成功')
        //     res.end('ok')
        // })
    })
}).listen(2760, () => {
    console.log('服务开启----')
})
