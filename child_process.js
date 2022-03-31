/*
 * @Date: 2022-03-30 23:05:08
 * @LastEditors: jimouspeng
 * @Description: nodejs-子进程
 * @LastEditTime: 2022-03-31 23:31:07
 * @FilePath: \node\child_process.js
 */

const path = require('path')
const execCwd = path.resolve('./childSrc')

/** 异步创建子进程方式 */
const { spawn, exec, execFile, fork } = require('child_process')

const syncChildA = spawn('node', ['child_a.js'], {
    cwd: execCwd,
})

/** 与主进程的stdin是可读流不同，创建的子进程的stdin是可写流 */
console.log(syncChildA.stdin.writable, syncChildA.stdout.writable, '看看子进程属性') // true false 看看子进程属性
syncChildA.stdin.write('父进程给childA发送消息')

syncChildA.stdout.on('data', (chunk) => {
    console.log(chunk.toString(), '打印了输入内容???')
})
syncChildA.on('close', (code) => {
    console.log('子进程A已退出，退出码 ' + code)
})

const syncChildB = exec(
    'node child_b.js',
    {
        cwd: execCwd,
    },
    (err, stdout, stderr) => {
        console.log(err, stdout, stderr, '打印看看child_b.js回调')
    }
)
syncChildB.stdout.on('data', (chunk) => {
    console.log(chunk.toString())
})
syncChildB.on('close', (code) => {
    console.log('子进程B已退出，退出码 ' + code)
})

const syncChildC = execFile(
    'node',
    ['child_c.js'],
    {
        cwd: execCwd,
    },
    (err, data) => {
        // console.log(err, data);
    }
)
syncChildC.stdout.on('data', (chunk) => {
    console.log(chunk.toString())
})
syncChildC.on('close', (code) => {
    console.log('子进程c已退出，退出码 ' + code)
})
syncChildC.on('message', (msg) => {
    console.log(msg, '收到消息没有') // 由于execFile创建的子进程不会产生内置通信通道，所以无法直接通信
})

const syncChildD = fork('./child_d.js', ['child'], {
    cwd: execCwd,
})

// syncChildD.disconnect();
syncChildD.send('直接这里发个消息哈哈哈')
syncChildD.on('message', (msg) => {
    console.log(msg, '收到消息', syncChildD.pid)
})
syncChildD.on('disconnect', () => {
    console.log('disconnect-----------')
})
syncChildD.on('close', (code, sign) => {
    console.log('子进程-D退出-------', code, sign)
})
setTimeout(() => {
    syncChildD.kill()
}, 500)

setTimeout(() => {
    console.log('起一个循环吧')
}, 5000)

process.stdin.on('data', (err, data) => {
    console.log(err, data, '收集输入')
})

/** 同步创建子进程方式 */
// const { spawnSync, execSync, execFileSync } = require('child_process');
// const childA = spawnSync('node', ['child_a.js'], {
//     cwd: execCwd,
// });
// childA.output.forEach((el) => {
//     if (el && el.byteLength) {
//         console.log(el.toString());
//     }
// });

// const childB = execSync('node child_b.js', {
//     cwd: execCwd,
// });
// console.log(childB.toString());

// const childC = execFileSync('node', ['child_c.js'], {
//     cwd: execCwd,
// });
// console.log(childC.toString());
