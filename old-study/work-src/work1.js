const {
    parentPort,
    getEnvironmentData,
    receiveMessageOnPort,
    workerData,
    BroadcastChannel,
} = require('worker_threads');

const bc = new BroadcastChannel('hello');
bc.postMessage('hello from every worker1');
const bcJimous = new BroadcastChannel('jimous');
bcJimous.onmessage = (event) => {
    console.log(event.data, '收到主线程broadcastChannel消息');
};

console.log('log workerData-------------------', workerData);

console.log('work1.js----------------', getEnvironmentData('name'));

setTimeout(() => {
    console.log('work1----timeout');
    parentPort.postMessage('work1--send msg jimous1212---');
}, 3000);

parentPort.on('message', (msg) => {
    console.log('wrok1接受到了主线程的消息');
    const portCtx = msg.myport;
    portCtx.on('message', (msg) => {
        console.log(msg, '接受的port1消息1');

        // 关闭port通道
        portCtx.close();
    });
    portCtx.postMessage('work1 send this``````````````````````````````````````');
});

// process.stdin.on('data', (chunk) => {
//     console.log('获取输入内容: ', chunk);
// });
