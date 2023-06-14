/** process: 信号事件与注册事件
 *
 * 信号事件：
 * 当进程接收到信号时触发
 * Windows 不支持发送信号，但 Node.js 提供了一些仿真方法 process.kill() 和 child_process.kill()
 * 发送信号 0 可用于测试一个进程是否存在。发送 SIGINT、 SIGTERM 和 SIGKILL 会导致目标进程无条件终止
 *
 */
const { red, green } = require('colorette')
const process = require('process')

/** 进程事件注册
 * beforeExit: 当 Node.js 清空其事件循环并且没有额外的工作要安排时，则会触发 'beforeExit' 事件
 *             注意：【当显式调用了 process.exit() 时，不会触发beforeExit事件】
 * exit: 触发条件[ 1. process.exit()被显式调用； 2. nodejs事件循环不再需要执行任何额外操作 ]
 *       此时没有办法阻止事件循环的退出，一旦exit的回调执行完毕，nodejs进程将终止，从而使在事件
 *       循环中排队的其他工作都被丢弃，比如注册的setTimeout函数。
 */
process.on('warning', (err) => {
    console.log(green('event-warning: '), err)
})
process.on('beforeExit', (code) => {
    console.log(red('event-beforeExit: '), code)
})
process.on('exit', (code, res) => {
    setTimeout(() => {
        console.log('This will not run')
    }, 0)
    console.log(red('event-exit: '), code, res)
})

/** 信号事件
 * SIGTERM: Windows 上不支持，可以监听
 * SIGHUP: 在 Windows 上是在关闭控制台窗口时生成，在其他平台上是在各种类似条件下生成
 * SIGINT: 开启io输入时，ctrl+c会触发
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
