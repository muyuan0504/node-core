// process.disconnect();
console.log('运行了child_d.js', process.channel, process.connected);
process.send('jimous is cool');
process.send('yes?');
console.log('disconnect后打印', process.connected, process.pid);
// process.send('get?');
// process.kill();
setTimeout(() => {
    console.log(process.killed, '触发了吗');
}, 2000);

process.on('message', (msg) => {
    console.log('收到父进程消息: ', msg);
});


