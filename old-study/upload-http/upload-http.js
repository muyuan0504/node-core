const { createServer } = require('http');
const { Buffer } = require('buffer');
const fs = require('fs');

createServer((req, res) => {
    console.log(req.method);
    /**
     * 统一设置跨域配置Access-Control-Allow-Headers:
     * 设置对服务器的CORS请求支持名为X-Custom-Header的自定义标头
     * 可支持的请求首部名字。请求头会列出所有支持的首部列表，用逗号隔开
     * 简单首部
     * 如 simple headers、Accept、Accept-Language、Content-Language、Content-Type 它们始终是被支持的（只限于解析后的值为 application/x-www-form-urlencoded、multipart/form-data 或 text/plain 三种MIME类型（不包括参数）），不需要在这个首部特意列出
     */
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'x-custom-header,Content-Type');
    res.setHeader('Access-Control-Max-Age', 600);
    // res.setHeader('Access-Control-Allow-Credentials', 'true');
    // res.setHeader("Access-Control-Allow-Headers", "Content-Type,Access-Token");
    if (req.method === 'OPTIONS') {
        /** 处理options请求 */
        // res.writeHead(200, {
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        //     'Access-Control-Allow-Headers': 'x-custom-header',
        //     'Access-Control-Max-Age': 600,
        // });
        res.writeHead(200);
        res.on('close', () => {
            console.log('options请求被return');
        });
        res.end();
    } else if (req.url === '/form_post') {
        /** 以下为form表单提交文件处理 */
        res.writeHeader(200);
        let fileBuf = Buffer.alloc(0);
        const writeStream = fs.createWriteStream('./picinfo.txt');
        const writeStream2 = fs.createWriteStream('./picinfo2.txt');
        const writeStream3 = fs.createWriteStream('./picinfo3.txt');
        req.on('data', (chunk) => {
            // console.log('接收数据: ', chunk, typeof chunk)
            fileBuf = Buffer.concat([fileBuf, chunk]);
        });
        req.on('end', () => {
            var rems = [];
            //根据\r\n分离数据和报头
            for (var i = 0; i < fileBuf.length; i++) {
                var v = fileBuf[i];
                var v2 = fileBuf[i + 1];
                /** ascii码判断  chr(10) 换行 chr(13) 回车 Chr(13)&chr(10) 回车换行 */
                if (v == 13 && v2 == 10) {
                    rems.push(i);
                }
            }
            console.log('看看分行符号位置: ', rems);
            /** 拿到图片信息, rems[0]+2是处理掉换行占用的字节位 */
            var picInfo = fileBuf.slice(rems[0] + 2, rems[1]).toString();
            const picByte = fileBuf.slice(rems[3] + 2, rems[rems.length - 2]);
            console.log(picInfo.match(/filename=".*"/g), '打印后缀');
            const picName = picInfo.match(/filename=".*"/g)[0].split('"')[1];
            writeStream.write(picByte);
            writeStream2.write(picInfo);
            writeStream3.write(fileBuf);
            fs.writeFileSync(`./${picName}`, picByte);
            console.log(
                fileBuf.slice(rems[0] + 2, rems[1]).toString().length,
                '-------',
                fileBuf.slice(rems[0], rems[1]).toString().length
            );
            res.end(fileBuf.slice(rems[0], rems[1]).toString());
        });
    } else if (req.url === '/upload_img') {
        console.log(req);
        /** 通过FormData对象上传文件 */
        let fileBuf = Buffer.alloc(0);
        res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' }); // 解决中文乱码
        const writeStream = fs.createWriteStream('./picinfo.txt');
        const writeStream2 = fs.createWriteStream('./picinfo2.txt');
        const writeStream3 = fs.createWriteStream('./picinfo3.txt');
        req.on('data', (chunk) => {
            console.log(chunk, '看看文件？');
            fileBuf = Buffer.concat([fileBuf, chunk]);
        });
        req.on('end', () => {
            const rems = [];
            //根据\r\n分离数据和报头
            for (var i = 0; i < fileBuf.length; i++) {
                var v = fileBuf[i];
                var v2 = fileBuf[i + 1];
                /** ascii码判断  chr(10) 换行 chr(13) 回车 Chr(13)&chr(10) 回车换行 */
                if (v == 13 && v2 == 10) {
                    rems.push(i);
                }
            }
            /** 拿到图片信息, rems[0]+2是处理掉换行占用的字节位 */
            var picInfo = fileBuf.slice(rems[0] + 2, rems[1]).toString();
            const picByte = fileBuf.slice(rems[3] + 2, rems[rems.length - 2]);
            const picName = picInfo.match(/filename=".*"/g)[0].split('"')[1];
            writeStream.write(picByte);
            writeStream2.write(picInfo);
            writeStream3.write(fileBuf);
            fs.writeFileSync(`./${picName}`, picByte);
            console.log(
                fileBuf.slice(rems[0] + 2, rems[1]).toString().length,
                '-------',
                fileBuf.slice(rems[0], rems[1]).toString().length
            );
            const body = {
                code: 0,
                data: [],
                msg: '文件上传成功',
            };
            res.end(JSON.stringify(body));
        });
    } else if (req.url === '/get_info') {
        let reqBody = Buffer.alloc(0);
        req.on('data', (chunk) => {
            reqBody = Buffer.concat([reqBody, chunk]);
        });
        req.on('end', () => {
            console.log(decodeURI(reqBody).toString());
            const bodyParam = JSON.parse(reqBody.toString());
            console.log(bodyParam.userId, '拿到userid', bodyParam.name);
        });
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        const body = {
            code: -1,
            data: [],
            msg: '请求路由不对哦~',
        };
        res.end(JSON.stringify(body));
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        const htmlStr = fs.createReadStream('./error.html');
        res.on('close', () => {
            console.log('res----close');
        });
        htmlStr.pipe(res);
    }
}).listen(2760, () => {
    console.log('服务开启----');
});
