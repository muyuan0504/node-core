/** process: 信号事件与注册事件
 *
 * 信号事件：
 * 当进程接收到信号时触发
 * Windows 不支持发送信号，但 Node.js 提供了一些仿真方法 process.kill() 和 child_process.kill()
 * 发送信号 0 可用于测试一个进程是否存在。发送 SIGINT、 SIGTERM 和 SIGKILL 会导致目标进程无条件终止
 *
 */

const process = require('process')

process.on('exit', (code, res) => {
    console.log('event-exit: ', code, res)
})

/** 信号事件
 * SIGTERM: Windows 上不支持，可以监听
 * SIGHUP: 在 Windows 上是在关闭控制台窗口时生成，在其他平台上是在各种类似条件下生成
 */
process.on('SIGTERM', () => {
    console.log('signal-SIGTERM~~~')
})

process.on('SIGINT', () => {
    console.log('signal-SIGINT~~~')
})

process.on('SIGHUP', () => {
    console.log('signal-SIGHUP~~~')
})
