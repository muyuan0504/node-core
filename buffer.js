/*
 * @Author: jimouspeng
 * @Date: 2022-03-29 17:51:44
 * @Description: buffer操作
 * @FilePath: \node\buffer.js
 */
const { Buffer } = require('buffer')

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

const oneBlob = new strBuf.Blob('jimous is cool')

console.log(oneBlob)
