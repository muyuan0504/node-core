const path = require('path');
// const workPath = path.resolve('./work-src');
const { Worker, isMainThread, setEnvironmentData, receiveMessageOnPort } = require('worker_threads');

const { port2 } = require('./work-src/msg-channel.js');

setEnvironmentData('name', 'jimous');

const worker1 = new Worker('./work-src/work1.js', { workerData: 'jimous/ssfefsfesf' });
new Worker('./work-src/work2.js');
new Worker("console.log('打印一波')", { eval: true });

console.log(isMainThread, '看看isMainThread');

console.log(worker1.performance.eventLoopUtilization());

console.log(worker1.resourceLimits, 'console.log(worker1.resourceLimits)');

worker1.postMessage('你是哪个工作线程呀');

worker1
    .getHeapSnapshot()
    .then((res) => {
        console.log(res, '看下回调');
    })
    .catch((err) => {
        console.log(err, '捕获worker1报错');
    });

worker1.on('online', () => {
    console.log('开始执行工作线程');
    setTimeout(() => {
        console.log(receiveMessageOnPort(port2), '?????????????????????????????????????????');
    }, 1000);
});
worker1.on('message', (msg) => {
    console.log(msg, '接受工作线程消息');
});

// process.stderr.on('data', (data) => {
//     console.log('打印可读流-------------', data);
// });

// process.exit();
