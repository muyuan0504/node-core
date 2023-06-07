/** commander webpack-cli核心模块，用于处理参数解析(将参数解析为选项和命令参数)与配置合并 */

const { program } = require('commander')

program.version('1.0.2')
program.option('--first')
program.option('-s, --separator <char>')

program.parse()

const options = program.opts()

console.log(options)
