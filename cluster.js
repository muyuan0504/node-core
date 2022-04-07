/*
 * @Date: 2022-04-01 21:24:24
 * @LastEditors: jimouspeng
 * @Description: nodejs-cluster集群
 * @LastEditTime: 2022-04-07 08:00:03
 * @FilePath: \node\cluster.js
 */

const http = require('http')
const path = require('path')
const os = require('os')
const execCwd = path.resolve('./cluster-src')

const cluster = require('cluster')
const { fork } = require('child_process')

console.log('isSetting: ', cluster.isPrimary, os.cpus().length, cluster.isMaster)

/** 事件监听 */
cluster.on('fork', (worker) => {
    console.log('fork监听：', worker.process.pid)
})
cluster.on('exit', (code) => {
    console.log('exit监听', code)
})

/** 方式1以下代码风格将主进程子进程逻辑写到一起，通过cluster.isMsater来区分执行环境，不是那么友好 */
// if (cluster.isMaster) {
//     for (var i = 0, n = os.cpus().length; i < n; i += 1) {
//         cluster.fork() // 主进程负责创建子进程
//     }
// } else {
//     /** 集群操作 */
//     console.log(process.pid)
//     http.createServer((req, res) => {
//         res.end('' + process.pid)
//     }).listen(8080, () => {
//         console.log('端口已监听')
//     })
// }

/** 方式2 利用cluster.setupPrimary函数将子进程逻辑代码拆分出去 */
cluster.setupPrimary({
    exec: 'cluster-child.js',
    args: ['--use', 'http'],
})
for (var i = 0, n = os.cpus().length; i < n; i += 1) {
    cluster.fork()
}
