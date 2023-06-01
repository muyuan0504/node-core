/** sse: 服务端推送
 * SSE 使用 HTTP 协议，现有的服务器软件都支持。WebSocket 是一个独立协议。
 * SSE 属于轻量级，使用简单；WebSocket 协议相对复杂。
 * SSE 默认支持断线重连，WebSocket 需要自己实现。
 * SSE 一般只用来传送文本，二进制数据需要编码后传送，WebSocket 默认支持传送二进制数据。
 * SSE 支持自定义发送的消息类型。
 */
const http = require('http');

http.createServer(function (req, res) {
    let fileName = '.' + req.url;

    if (fileName === './stream') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream', // Content-Type必须指定 MIME 类型为event-steam
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive',
            'Access-Control-Allow-Origin': '*',
        });
        /** 服务端推送的数据格式
         * 每一次发送的信息，由若干个message组成，每个message之间用\n\n分隔。每个message内部由若干行组成，每一行都是如下格式
         * [field]: value\n
         * field ->  data | event | id | retry (还可以有冒号开头的行，表示注释)
         */
        res.write('retry: 10000\n');
        res.write('event: connecttime\n');
        res.write('data: ' + new Date() + '\n\n');
        res.write('data: ' + new Date() + '\n\n');

        interval = setInterval(function () {
            res.write('data: ' + new Date() + '\n\n');
            res.write('event:jimous\n'); // 这里的 \n表示换行
            res.write('data: jimous is cool\n\n'); // 这里的\n\n表示数据收尾
        }, 2000);

        req.connection.addListener(
            'close',
            function () {
                console.log('客户端关闭了连接');
                clearInterval(interval);
                res.write('你关闭吧');
            },
            false
        );
    }
}).listen(8844);
