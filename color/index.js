/** 终端控制台彩色文本 https://www.npmjs.com/package/colorette */
// import { blue, bold, underline } from 'colorette'
const { blue, bold, underline, yellow } = require('colorette')

console.log(blue("I'm blue"), bold(blue('da ba dee')), underline(bold(yellow('da ba daa'))))


console.log('测试\x1b[3;9;32m%s\x1b[31m文本\x1b[0m样式', '终端')
