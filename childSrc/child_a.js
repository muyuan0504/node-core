console.log('运行了child_a')
// process.exit(999);
process.stdin.on('data', (chunk) => {
    console.log(chunk.toString(), '收到父进程`````````````````````````````````````````')

    /** 因为这里相当于进程操作，进程下的stdout是可写流，stdin的可读流，而子进程对象的stdin是可写流 */
    console.log(process.stdout.writable, process.stdin.writable, '看看可写性') // true false

    process.stdout.write('尝试给父进程发消息')
})
