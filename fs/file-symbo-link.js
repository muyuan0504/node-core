/** fs: 符号链接
 * fs.symlink(target, path[, type=null], callback):
 *     创建名为 path 指向 target 的链接
 *     type 参数仅在 Windows 上可用，在其他平台上被忽略。 可以设置为 'dir'、'file' 或 'junction'
 *     如果 type 参数未定义，Node 将自动检测 target 类型并自动选择 dir 或 file
 * fs.unlink(path, callback)
 *     删除文件或符号链接,除了可能的异常之外，没有为完成回调提供任何参数
 * fs.readlink(path[, options], callback)
 *     读取 path 引用的符号链接的内容, 即target的路径。 回调有两个参数 (err, linkString)
 *     可选的 options 参数可以是指定编码的字符串，也可以是具有 encoding 属性（指定用于返回的链接路径的字符编码）的对象, 默认值： 'utf8'。
 *     如果将 encoding 设置为 'buffer'，则返回的链接路径将作为 <Buffer> 对象传入
 *     @return  <Promise> 成功时将使用 linkString 履行
 */

const fs = require('fs')
const path = require('path')
const process = require('process')

const targetFile = path.resolve(__dirname, './a.text')
const pathFile = path.resolve(__dirname, './b.text')

/** 符号链接权限
 * fs.lchmod(path, mode, callback) - 此方法仅在 macOS 上实现
 * fs.lchown(path, uid, gid, callback) - 设置符号链接的所有者
 */

/** 符号链接操作 */
fs.access(pathFile, (err) => {
    if (err) {
        fs.symlink(targetFile, pathFile, (err) => {
            console.log('err: ', err)
        })
        return
    }
    fs.readlink(pathFile, (err, linkString) => {
        // 从符号链接指向真实的文件地址，即target的绝对路径
        console.log(err, linkString)
    })
    /** 存在符号链接 */
    fs.unlink(pathFile, (err) => {
        console.log('unlink: ', err)
    })
})

process.nextTick(() => {
    console.log('nextTick...')
})
