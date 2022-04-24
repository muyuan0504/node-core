const net = require('net');

/** 运行服务端 */
const dataServer = new net.Server(function (connect) {
    /** connect是 net.Socket 的实例, 服务端通过soket连接通信 */
    let tcpString = '';
    connect.setEncoding('utf-8');
    connect.on('data', (chunk) => {
        tcpString = tcpString + chunk.toString();
        console.log('数据:', tcpString);
        connect.write('from connect \n');
    });
    connect.on('close', (status) => {
        console.log('关闭:', status);
    });
    connect.write('jimous is cool~ \n');
});

dataServer.on('listening', (err) => {
    console.log(err, '绑定端口成功');
});

dataServer.on('connection', (socket) => {
    socket.write('恭喜你连上了-------------\n');
    socket.write('fron socket: abcdsd');
    /** 这里监听的data跟new net.Server绑定的sockets实例的data事件重复了，虽然都会触发，但是没有必要 */
    // socket.on('data', (chunk) => {
    //     console.log('数据2:', chunk.toString());
    // });
});

dataServer.listen(9000, () => {
    console.log('开启端口监听');
});

/** 运行客户端 */
// const dataApp = new net.Socket();
// const dataSocket = dataApp.connect(9527, '127.0.0.1', (connect) => {
//     // connect.on('data', (chunk) => {
//     //     console.log(chunk, '000000000000000000');
//     // });
//     console.log(connect);
// });
// dataSocket.on('ready', () => {
//     console.log('0');
// });

// dataSocket.on('data', (chunk) => {
//     console.log('chunk');
// });
