/** process io交互
 * process.stdin: 终端输入-可读流
 * process.stdout: 终端输出-可写流
 * process.stderr: 标准错误流，用于由程序发出的错误信息和诊断
 */

const process = require('process')
// 流性质检测
console.log('process.stdout writable test: ', process.stdout.writable)
console.log('process.stdin  readable test: ', process.stdin.readable)
console.log('process.stderr writable test: ', process.stderr.writable)
console.log('process.stderr  readable test: ', process.stderr.readable)
process.stderr.write('输出错误看看\n')

/** process.stdout: 标准输出流，向用户显示内容(程序的输出源) 进程终端写入-可写流
 * fd: process.stdout 的底层文件描述符的值
 */
console.log('process.stdout.fd: ', process.stdout.fd)
process.stdout.on('close', function () {
    console.log('process.stdout.event: close')
})
process.stdout.on('error', (err) => {
    console.log('process.stdout.event: ', err)
})

/** process.stdin: 标准输入流(程序的输入源) 进程读取终端输入-可读流
 * fd: process.stdin 的底层文件描述符的值
 */
console.log('process.stdin.fd: ', process.stdin.fd)
process.stdin.setEncoding('utf-8') // 为从Readable流读取的数据设置字符编码
process.stdin.on('pause', () => {
    console.log('process.stdin event: pause 数据流终止')
})
process.stdin.on('end', () => {
    console.log('process.stdin event: end 数据终止')
    // 调用stdout.end，结束可写流，后续终端无法输入内容
    process.stdout.end('end with 10086', function () {
        console.log('可写流关闭')
    })
})
process.stdin.on('data', (chunk) => {
    /** 需要trim处理换行符,默认接收的chunk数据带有 \r\n */
    const chunkStr = chunk.trim()
    const chunkData = { chunk, chunkTrim: chunkStr }
    process.stdout.write(JSON.stringify(chunkData) + '写入数据\n')
    if (chunkStr === 'pause') {
        // 调用pause, 停止触发可读流'data'事件， 会触发进程exit事件
        process.stdin.pause()
    }
    if (chunkStr === 'exit') {
        process.exit()
    }
    if (chunkStr === 'end') {
        /** 当满足输入条件，手动触发'end'事件 */
        process.stdin.emit('end')
        // 调用destory销毁流，当传入参数会触发'error'事件，最后触发'close'事件
        process.stdout.destroy('errorData')
    }
})

/** 交互设计 */
process.stdout.write('process.stdout\033[31m1. 輸入一下唄\x1b[0m哈哈\n') // \x1b[0m -> 用于重置文本样式
// process.stdin.resume() // 将进程输入可读流切换到流动模式, 由于添加了'data'事件监听，所以不需要通过resume来切换流动模式
