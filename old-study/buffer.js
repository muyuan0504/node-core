/*
 * @Author: jimouspeng
 * @Date: 2022-03-29 17:51:44
 * @Description: buffer操作
 * @FilePath: \node\buffer.js
 */
const { Buffer, Blob } = require('buffer')
const fs = require('fs')
const path = require('path')

const picInfo = fs.readFileSync('./pic.jpg')
console.log('picInfo', picInfo)
fs.writeFileSync('./picinfo.jpg', picInfo)

const oneBuf = Buffer.from(new String('this is a test'))

const arrayBuf = Buffer.from([1, 2, 3])

// const isBuf = oneBuf[1]

// console.log('isBuf[1]: ', isBuf.toString('utf8'))

const str = 'Node.js'
const buf = Buffer.allocUnsafe(str.length)

for (let i = 0; i < str.length; i++) {
    buf[i] = str.charCodeAt(i)
}

console.log(buf.toString('utf8'), '看看')

console.log(oneBuf[1], oneBuf.toString(), Buffer.compare(oneBuf, arrayBuf))

console.log(new Uint32Array(arrayBuf))

const strBuf = Buffer.allocUnsafe(0)
console.log(strBuf, strBuf.toString('utf-8'))

console.log(Buffer.byteLength('sfefse'))

// console.log('单个 Buffer 实例允许的最大大小:', strBuf.constants.MAX_LENGTH);

const oneBlob = new Blob([buf]) // node下直接使用blob貌似会报错，ExperimentalWarning: buffer.Blob is an experimental feature. This feature could change at any time （node版本16.14.2）

console.log(oneBlob, oneBlob.size)

oneBlob.text().then((data) => {
    console.log(data, '打印看看oneblob')
})

oneBlob.arrayBuffer().then((res) => {
    console.log(res, '打印arraybuffer')
})

const newBlob = oneBlob.slice(0, 2)

newBlob.text().then((data) => {
    console.log(data, '截取data')
})

// const blobStream = oneBlob.stream();
// blobStream.on('data', function (chunk) {
//     console.log(chunk, '读取oneblob');
// });

// oneBlob.arrayBuffer().then((data) => {
//     console.log(data, '打印一波arraybuffer');
// });
