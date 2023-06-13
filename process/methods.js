const process = require('process')

/** 进程系统属性
 * uptime: @function 进程运行的秒数，返回值包括几分之一秒，使用Math.floor获得整秒
 */
const { uptime } = process
console.log('uptime: ', uptime())

/** 进程控制
 * abort: 立即退出进程并生成一个核心文件, worker线程中不可用
 * exit([code]): 退出进程，可选参数@code，如果省略则使用'成功'code：0,或process.exitCode已设置的值，worker线程中调用只退出当前线程
 * kill: 将signal发送到由pid标识的进程,实际上只是信号发送者,就像 kill 系统调用,发送的信号可能会做其他事情而不是杀死目标进程
 */
const { abort, exit, kill } = process
// abort()
setTimeout(() => {
    process.exit(22)
}, 2000)
console.log(process.pid, '??')
// kill(process.pid)

// console.log('process-----------------control')

/** 进程资源管理 */
const pMemoryUse = process.memoryUsage() // 进程的内存使用量
const pMemoryUseRss = process.memoryUsage.rss() // 以字节为单位的驻留集大小的整数
const pResourceUse = process.resourceUsage() // 资源使用情况
const getActiveResInfo = process.getActiveResourcesInfo() // 返回字符串数组，其中包含当前保持事件循环活动的活动资源的类型
const hasSetUncaughtCb = process.hasUncaughtExceptionCaptureCallback() // 是否通过setUncaughtExceptionCaptureCallback()设置回调

console.log('memoryUsage: ', JSON.stringify(pMemoryUse))
console.log('memoryUsage.rss: ', pMemoryUseRss)
console.log('resourceUsage: ', JSON.stringify(Object.keys(pResourceUse)))
console.log('getActiveResInfo', getActiveResInfo)
console.log('hasSetUncaughtCb', hasSetUncaughtCb)
