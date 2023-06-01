/*
 * @Author: jimouspeng
 * @Date: 2022-04-27 10:13:42
 * @Description:
 * @FilePath: \node\color-console.mjs
 */
import process from 'process';
import chalk from 'chalk';

console.log(chalk.blue('蓝色字体'));

process.stdout.write('your name: ');
process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (msg) => {
    console.log(chalk.yellow(msg));
});
