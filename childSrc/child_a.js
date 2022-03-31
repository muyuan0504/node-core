console.log('运行了child_a')
// process.exit(999);
process.stdin.on('data', (chunk) => {
    console.log(chunk.toString(), '收到父进程`````````````````````````````````````````')
    process.stdout.write('尝试给父进程发消息')
})
