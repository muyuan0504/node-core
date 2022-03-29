/*
 * @Author: jimouspeng
 * @Date: 2022-03-29 17:51:44
 * @Description: buffer操作
 * @FilePath: \node\buffer.js
 */
const { Buffer } = require('buffer');

const oneBuf = Buffer.from('jimous', 'utf8');

const arrayBuf = Buffer.from([1, 2, 3]);

console.log(oneBuf.toString());

console.log(new Uint32Array(arrayBuf));
