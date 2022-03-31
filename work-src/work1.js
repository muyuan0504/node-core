const { parentPort, getEnvironmentData, receiveMessageOnPort, workerData } = require('worker_threads');

console.log('log workerData-------------------', workerData)

const { port1 } = require('./msg-channel.js');

port1.postMessage({ hello: 'world' });
// console.log(receiveMessageOnPort(port2));

console.log('work1.js----------------', getEnvironmentData('name'));

setTimeout(() => {
    console.log('work1----timeout');
    parentPort.postMessage('work1--send msg---');
}, 3000);

parentPort.on('message', (msg) => {
    console.log(msg, '接受到了主线程的消息');
});

// process.stdin.on('data', (chunk) => {
//     console.log('获取输入内容: ', chunk);
// });
