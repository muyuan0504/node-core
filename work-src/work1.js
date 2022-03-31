const { parentPort, getEnvironmentData, receiveMessageOnPort, workerData } = require('worker_threads')

console.log('log workerData-------------------', workerData)

console.log('work1.js----------------', getEnvironmentData('name'))

setTimeout(() => {
    console.log('work1----timeout')
    parentPort.postMessage('work1--send msg---')
}, 3000)

parentPort.on('message', (msg) => {
    console.log('wrok1接受到了主线程的消息')
    msg.myport.postMessage('work1 send this``````````````````````````````````````')
})

// process.stdin.on('data', (chunk) => {
//     console.log('获取输入内容: ', chunk);
// });
