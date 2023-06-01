const { parentPort, workerData, BroadcastChannel } = require('worker_threads');

console.log('work2.js----------------');

console.log('work2: log workerData-------------------', workerData);

parentPort.on('message', (msg) => {
    console.log('work2接受到了主线程的消息');
    msg.myport.postMessage('work2 send this``````````````````````````````````````');
});

const bc = new BroadcastChannel('hello');
bc.postMessage('hello from every worker2');
const bcJimous = new BroadcastChannel('jimous');
bcJimous.onmessage = (event) => {
    console.log(event.data, '收到主线程broadcastChannel消息');
};
