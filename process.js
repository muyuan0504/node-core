const process = require('process');

process.exitCode = 666;

console.log(process.versions, 'node--version');

console.log(process.execArgv, '看看process.execArgv', process.pid, process.release);

process.on('exit', (code) => {
    console.log('进程执行exit', code);
});

const chooiceList = [1, 2, 3];

process.stdout.write('\033[31m1. 輸入一下唄 \n2.sfesf\n3.sfesfe\033[39m');
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let i = 3;

process.stdin.on('data', (data) => {
    console.log(`You typed ${data.toString()}`);
    i--;
    if (i > 0) {
        process.stdout.write(' \033[31m  輸入一下唄： \033[39m');
    } else {
        process.exit();
    }
});
