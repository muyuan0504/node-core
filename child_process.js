/*
 * @Date: 2022-03-30 23:05:08
 * @LastEditors: jimouspeng
 * @Description: nodejs-子进程
 * @LastEditTime: 2022-03-30 23:21:02
 * @FilePath: \node\child_process.js
 */

const path = require('path')
const { spawnSync, execSync } = require('child_process')

const childA = spawnSync('node', ['child_a.js'], {
    cwd: path.resolve('./childSrc'),
})

const childB = execSync('node child_b.js', {
    cwd: path.resolve('./childSrc'),
})

console.log('childA: ', childA.output)
childA.output.forEach((el) => {
    if (el && el.byteLength) {
        console.log(el.byteLength, el.toString())
    }
})
console.log('childB:', childB.toString())
