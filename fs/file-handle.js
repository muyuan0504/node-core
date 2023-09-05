/**
 * fs.Promises API
 *
 * FileHandle 类：
 *   是【数字文件描述符】的对象封装，通过 fs.Promises.open() 创建，指向某个文件, 默认权限为'r'
 *   所有的 <FileHandle> 对象都是 <EventEmitter>
 *   如果未使用 filehandle.close() 方法关闭 <FileHandle>，则它将尝试自动关闭文件描述符并触发进程警告，从而有助于防止内存泄漏。
 *   建议始终显示关闭 <FileHandle>
 */

const { useFsDir } = require('./fs-dir')
const { fileHandle } = require('./fs-write')
const { Buffer } = require('buffer')

const { blue, bold, underline, yellow } = require('colorette')
const path = require('path')
const filePath = path.resolve(__dirname, './a.txt')
const dirPath = path.resolve(__dirname, './a')

console.log(underline(blue('file path: ')), filePath)
console.log(underline(yellow('dir path: ')), dirPath)

// const { promises } = require('fs', 'r')
const { promises, constants } = require('fs')

// console.error(constants, '---------- aiden --------------', promises)

// console.log('key of promises: ', Object.keys(promises))

const usePromise = async () => {
    // 文件操作
    // await promises.chmod(filePath, constants.W_OK)
    const fhCtx = await promises.open(filePath, 'r+')
    console.log('fileHandle 实例: ', fhCtx.fd)
    // close事件 新增于: v15.4.0
    fhCtx.on &&
        fhCtx.on('close', (error) => {
            console.error('---------- aiden --------------', error, '文件关闭')
        })

    /** filehandle.readableWebStream(options) 新增于: v17.0.0
     *  返回可用于读取文件数据的 ReadableStream；如果多次调用此方法或在 FileHandle 关闭中或关闭后调用该方法会报错
     */
    if (fhCtx.readableWebStream) {
        for await (const chunk of fhCtx.readableWebStream()) {
            console.error('---------- chunk --------------', chunk)
        }
    }

    const fileTxt = await fhCtx.readFile('utf8')
    console.error('---------- readFile --------------', fileTxt)

    const fileBuf = Buffer.from(fileTxt, 'utf-8')

    console.error('---------- aiden fileBuf --------------', fileBuf.toString(), fileBuf.byteLength)

    // await fhCtx.appendFile('满堂花醉三千客', 'utf8')

    const useBuf = Buffer.alloc(27)
    const bufData = await fhCtx.read(useBuf, 0, 12, 3, 12) // 这里汉字占是三个字符，所以这里要处理好从文件开始读取数据的位置，如果非3的倍数位置，会乱码
    console.error('---------- aiden --------------', bufData, bufData.bytesRead, bufData.buffer.toString('utf8'))
    // fileHandle.appendFile(fhCtx)
    // const result = await promises.access(filePath, constants.W_OK)
    // console.error('---------- aiden1 --------------', result)
    fhCtx.close()
    // // 目录操作, 读取目录流
    // const dir = await promises.opendir(dirPath)
    // await useFsDir(dir)
    // console.error('---------- aiden --------------')
    // // useFsDir(dir)
}

usePromise()
