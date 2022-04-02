const {
    METHODS,
    STATUS_CODES,
    maxHeaderSize,
    globalAgent,
    createServer,
    validateHeaderName,
    validateHeaderValue,
    get,
    request,
} = require('http');

console.log('解析器支持的 HTTP 方法列表', METHODS);
// console.log('所有标准 HTTP 响应状态代码的集合', STATUS_CODES);

const server = createServer((req, res) => {
    const { url } = req;
    if (/favicon.ico/.test(url)) {
        // 过滤掉图标请求
        return;
    }
    console.log(url);
    const clientReq = get('http://127.0.0.1:9527', { headers: { slef: 'jimous' } }, (res) => {
        const { statusCode, headers } = res;
        if (statusCode !== 200) {
            res.resume(); // 消费响应数据以释放内存
        }
        console.log(statusCode, '拿到9727数据', res.readable, headers);
        let chunk = '';
        res.on('data', (data) => {
            console.log(data.byteLength, '拿到数据');
            if (data && data.byteLength > 0) {
                chunk += data.toString();
            }
        });
        res.on('end', () => {
            handlerResponse(chunk);
        });
    });
    console.log('请求的主机： ', clientReq.host);
    clientReq.on('response', (data) => {
        console.log('收到了服务器回调------------');
    });

    const postReq = request('http://127.0.0.1:9527', {
        method: 'POST',
    });
    postReq.write('jimous is cool');
    postReq.end();

    // clientReq.end(); // get创建的请求会自动调用req.end()
    function handlerResponse(data) {
        res.writeHead(200, { 'content-Type': 'application/json', 'sleft-content': 'jimous-server' });
        res.end('jimous server' + data);
    }
    // console.log(req.writable, res.writable); // undefined, true
    // console.log('globalAgent:', globalAgent);
    // console.log('maxHeaderSize:', maxHeaderSize);
    // try {
    //     console.log(' validateHeaderName: ', validateHeaderName(''));
    // } catch (err) {
    //     console.log('validateHeaderNameerr:', err);
    // }
    // try {
    //     console.log('validateHeaderValue: ', validateHeaderValue('x-my-header', undefined));
    // } catch (err) {
    //     console.log('validateHeaderValue:', err);
    // }
});

server.headersTimeout = 3000;
console.log('headerTimeout', server.headersTimeout, server.keepAliveTimeout);

server.listen(8000, () => {
    console.log('server start----');
});
