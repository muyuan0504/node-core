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
import inquirer from 'inquirer';

console.log(chalk.blue('hhhhhhh'));

const execDir = fs.readdirSync(process.cwd());
console.log(execDir);

const promptKeys = ['jimous-question', 'jimous', 'jimous-string'];
const promptList = {
    'jimous-question': [1, 2, 3],
    jimous: [4, 5, 6],
    'jimous-string': '输入你的名字',
};
inquirer
    .prompt([
        {
            type: 'list',
            name: promptKeys[0],
            message: '这是jimous的question',
            choices: promptList[promptKeys[0]],
        },
        {
            type: 'list',
            name: promptKeys[1],
            message: '这是jimous的question',
            choices: promptList[promptKeys[1]],
        },
        {
            type: 'string',
            name: promptKeys[2],
            message: promptList[promptKeys[2]],
        },
    ])
    .then((answers) => {
        // Use user feedback for... whatever!!
        console.log(answers);
    });
