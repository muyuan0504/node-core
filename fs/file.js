/** fs-文件 / 文件夹 操作
 * fs.readFile() 函数缓冲整个文件。 为了最小化内存成本，在可能的情况下优先通过 fs.createReadStream() 进行流式传输
 */
const fs = require('fs')
const path = require('path')

/** 文件操作-基于fd和path的两种方式, 基于AbortController类实现读取中断操作
 * fs.open(path[, flags[, mode]], callback):
 *     异步打开文件, 通过fd-文件描述符操作文件
 *     回调有两个参数 (err, fd)，fd为文件描述符-整数型
 * fs.close: 关闭文件描述符
 * fs.createReadStream(path[, options]):  以流的形式从当前文件位置顺序读取
 *
 * [读取文件属性信息]:
 * fs.fstat(fd[, options], callback): 基于fd, callback返回 fs.stats类
 * fs.statfs(path[, options], callback):
 *     返回有关包含 path 的已安装文件系统的信息。 <新增于: v18.15.0>
 *     这样就不用依赖fd
 *     回调有两个参数 (err, stats)，其中 stats 是 <fs.StatFs> 对象
 *
 * [读取文件]：
 * fs.read(fd[, options], callback)：
 * fs.readFile(path[, options], callback):
 *    中止正在进行的请求不会中止单个操作系统请求，而是中止内部缓冲的 fs.readFile 执行
 * fs.readv(fd, buffers[, position], callback):
 *     从 fd 指定的文件读取并使用 readv() 写入 ArrayBufferView 的数组
 *     读取多个文件并将它们合并成一个缓冲区。buffers 参数是一个 Buffer 数组，用于存储读取的数据
 */
const filePath = path.resolve(__dirname, './a.text')
const openFlags = 'r'
const statConfig = { bigint: false } //  返回的 <fs.StatFs> 对象中的数值是否应为 bigint, 默认为false
fs.open(filePath, openFlags, (err, fd) => {
    if (err) return
    console.log('fs.open打开的文件描述符：', fd)
    fs.fstat(fd, statConfig, (err, stats) => {
        if (err) return
        console.log('fs.fstat文件属性： ', JSON.stringify(Object.keys(stats)))
        fs.close(fd, (err) => {
            console.log('close fd: ', err)
        })
        const bf = Buffer.alloc(10)
        const position = null
        fs.readv(fd, [bf], position, (err, bytesRead) => {
            console.log(err, bytesRead, bf.toString(), 'hahah哈哈哈哈')
            fs.close(fd)
        })
    })
})

if (fs.statfs) {
    fs.statfs(filePath, statConfig, (err, stats) => {
        if (!err) {
            console.log('fs.statfs文件属性： ', JSON.stringify(Object.keys(stats)))
        }
    })
}

const ac = new AbortController()
ac.signal.addEventListener('abort', () => {
    console.log('ac.singal abort !')
})
const { signal } = ac
const readOptions = {
    encoding: 'utf-8', // 默认为null
    flag: 'r', // 支持文件系统 flags, 见 readme.md
    signal,
}
fs.readFile(filePath, readOptions, (err, data) => {
    if (err) {
        console.log('读取中断')
        return
    }
    console.log('fs.readFile 读取文件: ', err, data)
})
ac.abort()

const readStreamOptions = {
    flags: 'r', // 默认为 'r'
    encoding: 'utf8', // 默认为 null
    fd: null, // 默认为null
    autoClose: true, // 默认为true
    emitClose: true, // 默认为true
    // start: 0, // 开始读取的起始位, 默认为undefined
    end: Infinity, // 读取文件终止位
    highWaterMark: 64 * 1024, // 最高允许切换传输的字节数, 默认为 64kb
    fs: null,
}
const readFileStream = fs.createReadStream(filePath, readStreamOptions)
readFileStream.on('data', (chunk) => {
    console.log('fs.createReadStream解析chunks: ', chunk)
})

/** 文件/夹 信息获取
 *
 */
