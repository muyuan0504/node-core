/** fs-目录操作
 * fs.mkdir(path[, options], callback): 创建目录
 * fs.cp(src, dest[, options], callback):
 *     将整个目录结构从 src 异步地复制到 dest，包括子目录和文件
 *     src: 要赋值的源路径；dest: 要复制到的目标路径
 * fs.opendir(path[, options], callback):
 *     异步地打开目录
 *     会创建 <fs.Dir>类实例，其中包含用于从目录读取和清理目录的所有进一步的函数
 * fs.readdir(path[, options], callback): 读取目录的内容:
 *     callback 回调有两个参数 (err, files)，其中 files 是目录中文件名的数组，不包括 '.' 和 '..'
 * fs.rmdir(path[, options], callback): 删除目录
 * fs.rm(path[, options], callback)： 除了删除文件，也可用于目录的删除, 可用于类似Unix命令的 rm -rf 的行为，因为支持配置 force
 *
 */

const fs = require('fs')
const path = require('path')
const process = require('process')

const pathA = path.resolve(__dirname, './image/')
const pathB = path.resolve(__dirname, './src/')

/** 目录创建操作 */
fs.mkdir(pathA, (err, path) => {
    console.log('mkdir', err, path)
})

/** 目录copy操作 */
const cpConfig = {
    recursive: true, // 递归复制目录, 默认为false
    force: true, // 覆盖现有的文件或目录。 如果将此设置为 false 并且目标存在，则复制操作将忽略错误; 默认为 true
    errorOnExist: false, // 当 force 为 false 且目标存在时，则抛出错误。 默认值： false
    dereference: false, // 取消引用符号链接，默认为false
    filter: () => true, // 过滤复制文件/目录的函数 返回 true 则复制条目，返回 false 则忽略它 默认值： undefined 的 Promise
    preserveTimestamps: false, // 当为 true 时，则 src 的时间戳将被保留
    verbatimSymlinks: false, // 当为 true 时，则符号链接的路径解析将被跳过
}
fs.cp(pathB, pathA, cpConfig, (err) => {
    console.log('cp 目录', err)
})

/** 打开目录流, opendir */
const openConfig = {
    encoding: 'utf8', // <string> | <null> 默认值： 'utf8'
    bufferSize: 32, //  <number> 当从目录读取时，在内部缓冲的目录条目数。 值越大，性能越好，但内存使用率越高。 默认值： 32
}
fs.opendir(pathA, openConfig, (err, dir) => {
    console.log(err, dir)
    console.log('opendir: ', dir.path)
})

/** 读取目录信息 */
const readConfig = {
    encoding: 'utf8', //  <string> 默认值： 'utf8', 如果 encoding 设置为 'buffer'，则返回的文件名将作为 <Buffer> 对象传入
    withFileTypes: false, // <boolean> 默认值： false
}
fs.readdir(pathA, readConfig, (err, files) => {
    console.log('readdir: ', err, files)
})

/** 目录删除操作 */
const rmConfig = {
    force: true, // 强制删除，当force为true,path 不存在，则异常将被忽略；默认为false
    recursive: true, // 如果为 true，则执行递归删除。 在递归模式下，操作将在失败时重试。 默认值： false
    maxRetries: 0, // 重试次数。 如果 recursive 选项不为 true，则忽略此选项。 默认值： 0
    retryDelay: 100, // 重试之间等待的时间，单位为毫秒。如果 recursive 选项不为 true，则忽略此选项
}
const rmdirConfig = {
    recursive: true, // 执行递归目录删除，在递归模式下，操作将在失败时重试
    maxRetries: 0, // 重试次数。 如果 recursive 选项不为 true，则忽略此选项。 默认值： 0
    retryDelay: 100, // 重试之间等待的时间，单位为毫秒。如果 recursive 选项不为 true，则忽略此选项
}
fs.rm(pathA, rmConfig, (err) => {
    console.log('rm-err: ', err)
})
fs.rmdir(pathB, rmdirConfig, (err) => {
    console.log('rmdir-err: ', err)
})

setTimeout(() => {
    console.log('setTimout---')
}, 0)

process.nextTick(() => {
    console.log('nextTick---')
})
