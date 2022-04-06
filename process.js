const process = require('process');

process.exitCode = 666;

console.log(process.versions, 'node--version');

console.log(process.execArgv, '看看process.execArgv', process.pid, process.release);

process.on('exit', (code) => {
    console.log('进程执行exit', code);
});

let i = 0;

// setInterval(() => {
//     i++
//     console.log(i)
//     if (i > 5) {
//         process.exit()
//         // process.abort()
//     }
// }, 1000)

process.stdout.write(' \033[31m  輸入一下唄： \033[39m');
process.stdin.resume();

process.stdin.on('data', (data) => {
    console.log(`You typed ${data.toString()}`);
    process.exit();
});
