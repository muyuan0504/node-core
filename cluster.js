/*
 * @Date: 2022-04-01 21:24:24
 * @LastEditors: Please set LastEditors
 * @Description: nodejs-cluster集群
 * @LastEditTime: 2022-04-02 12:20:21
 * @FilePath: \node\cluster.js
 */

const path = require('path');
const os = require('os');
const execCwd = path.resolve('./cluster-src');

const cluster = require('cluster');
const { fork } = require('child_process');

console.log('isSetting: ', cluster.isPrimary);

for (var i = 0, n = os.cpus().length; i < n; i += 1) {
    cluster.fork();
}

/** 事件监听 */
cluster.on('fork', (worker) => {
    console.log('fork监听：', worker);
});
cluster.on('exit', (code) => {
    console.log('exit监听', code);
});

/** 集群操作 */
const worker1 = fork('./a.js', {
    cwd: execCwd,
});

// cluster.fork(worker1);
