const path = require('path');
// const workPath = path.resolve('./work-src');
const { Worker, isMainThread, setEnvironmentData, receiveMessageOnPort, BroadcastChannel } = require('worker_threads');

const { port1, port2 } = new MessageChannel();
const { port3, port4 } = require('./work-src/msg-channel.js');

setEnvironmentData('name', 'jimous');

const bc = new BroadcastChannel('hello');
bc.onmessage = (event) => {
    console.log(event.data, '主线程拿到broadcastChannel消息');
};

const bcJimous = new BroadcastChannel('jimous');
bcJimous.postMessage('hello from jimous');

const worker1 = new Worker('./work-src/work1.js', { workerData: 'jimous/ssfefsfesf' });
const worker2 = new Worker('./work-src/work2.js');
new Worker("console.log('打印一波')", { eval: true });

// console.log(isMainThread, '看看isMainThread')

// console.log(worker1.performance.eventLoopUtilization())

// console.log(worker1.resourceLimits, 'console.log(worker1.resourceLimits)')

port1.on('message', (msg) => {
    console.log('接受port2信息-------------', msg);
});
port1.postMessage('port1消息直发0');
console.log(receiveMessageOnPort(port2), '?????????????????????????????????????????');

port1.on('close', (port) => {
    console.log('port1通道关闭============================');
    port1.postMessage('尝试再发');
});
port2.on('close', (port) => {
    console.log('port2通道关闭============================');
});

port3.on('message', (msg) => {
    console.log('接受port4信息-------------', msg);
});
// 将port2发送给子线程，传输后，port在通道的发送端不再可用
worker1.postMessage({ myport: port2 }, [port2]);
worker2.postMessage({ myport: port4 }, [port4]);

// worker1
//     .getHeapSnapshot()
//     .then((res) => {
//         console.log(res, '看下回调')
//     })
//     .catch((err) => {
//         console.log(err, '捕获worker1报错')
//     })

worker1.on('online', () => {
    console.log('开始执行工作线程');
});
worker1.on('message', (msg) => {
    console.log(msg, '接受工作线程消息');
});

// process.stderr.on('data', (data) => {
//     console.log('打印可读流-------------', data);
// });

// process.exit();
