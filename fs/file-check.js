/** fs: 检测文件或路径是否存在 */

const path = require('path')
const fs = require('fs')

/** 检测操作, 因为有回调函数，所以是异步检测
 * 【在调用 fs.open()、fs.readFile() 或 fs.writeFile() 之前，不要使用 fs.access()或fs.stat() 检查文件的可访问性。
 *  这样做会引入竞争条件，因为其他进程可能会在两次调用之间更改文件的状态。用户代码应直接打开/读取/写入文件，并处理无法访问文件时引发的错误】
 * fs.exists(path, callback): 已弃用
 * fs.access(path[, mode], callback):
 *     测试用户对 path 指定的文件或目录的权限
 *     mode为可选参数，指定要执行的可访问性检查，默认为 fs.constants.F_OK
 *     mode可选值：fs.constants.F_OK 或由 fs.constants.R_OK、fs.constants.W_OK 和 fs.constants.X_OK 中的任何一个
 *     @return 如果有文件则返回err为null, 否则返回错误信息
 * fs.stat(path[, options], callback)
 *     callback回调有两个参数 (err, stats)，其中 stats 是 <fs.Stats> 对象
 *     @return 如果有文件则返回err为null, 否则返回错误信息
 */
const file = path.resolve(__dirname, './a.text')

fs.access(file, (err) => {
    if (err) {
        console.log('access-读取文件失败：', err)
        return
    }
    console.log('access-检测文件存在', err)
})
fs.stat(file, (err, stats) => {
    if (err) {
        console.log('stat-读取文件失败：', err)
        return
    }
    console.log('stat-检测文件存在: ', err, stats)
})
