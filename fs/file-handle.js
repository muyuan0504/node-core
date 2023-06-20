/**
 * fs.Promises API
 *
 * FileHandle 类：
 *   是【数字文件描述符】的对象封装，通过 fs.Promises.open() 创建，指向某个文件
 *   所有的 <FileHandle> 对象都是 <EventEmitter>
 *   如果未使用 filehandle.close() 方法关闭 <FileHandle>，则它将尝试自动关闭文件描述符并触发进程警告，从而有助于防止内存泄漏。
 *   建议始终显示关闭 <FileHandle>
 */

const { useFsDir } = require('./fs-dir')

const { blue, bold, underline, yellow } = require('colorette')
const path = require('path')
const filePath = path.resolve(__dirname, './a.text')
const dirPath = path.resolve(__dirname, './a')

console.log(underline(blue('file path: ')), filePath)
console.log(underline(yellow('dir path: ')), dirPath)

// const { promises } = require('fs', 'r')
const promises = require('fs/promises')

// console.log('key of promises: ', Object.keys(promises))

const usePromise = async () => {
    // 文件操作
    const fhCtx = await promises.open(filePath)
    fhCtx.on('close', (error) => {
        console.error('---------- aiden --------------', error, '文件关闭')
    })
    fhCtx.close()
    console.log('fileHandle 实例: ', fhCtx.fd)
    // 目录操作
    const dir = await promises.opendir(dirPath)
    await useFsDir(dir)
    console.error('---------- aiden --------------')
    // useFsDir(dir)
}

usePromise()
