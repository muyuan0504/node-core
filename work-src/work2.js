const { parentPort, workerData } = require('worker_threads');

console.log('work2.js----------------');

console.log('work2: log workerData-------------------', workerData);

parentPort.on('message', (msg) => {
    console.log(msg, '接受到了主线程的消息');
});
