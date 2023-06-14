/** 进程IPC通道: 子进程相关操作 */
const process = require('process')

/** 子进程收到父进程使用 childprocess.send()发送的消息时，就会触发'message'事件 */
process.on('message', (msg) => {
    console.log('子进程接收父进程消息：', msg)
})

/** IPC连接状态，如果连接返回true，调用disconnect()后返回false */
const connectStatus = process.connected
console.log('connect: ', connectStatus)

/** 向父进程发送IPC消息，消息将作为父对象ChildProcess对象上的'message'事件接收 */
process.send('测试消息', () => {
    console.log('消息发送成功')
})

/** 关闭通往父进程的IPC通道，一旦没有其他连接使其保持活动状态，则允许子进程正常退出 */
// process.disconnect()
