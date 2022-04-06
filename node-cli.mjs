/*
 * @Author: jimouspeng
 * @Date: 2022-04-06 13:52:35
 * @Description: node实现脚手架功能
 * @FilePath: \node\node-cli.mjs
 */

// const fs = require('fs');
// const process = require('process');

import fs from 'fs';
import process from 'process';
import chalk from 'chalk';

console.log(chalk.blue('hhhhhhh'));

const execDir = fs.readdirSync(process.cwd());
console.log(execDir);
