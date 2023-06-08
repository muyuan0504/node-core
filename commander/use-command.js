/** commander webpack-cli核心模块，用于处理参数解析(将参数解析为选项和命令参数)与配置合并 */

const { program } = require('commander')

// const program = new Command()

program.name('use-command').description('CLI to get user info').version('0.0.1')

/** 对于option，要保证输入的类型与定义的类型一致，如果不指定类型，则为boolean类型
 * eg: node ./index.js --school  ->  则接收 { school: true }
 *     node ./index.js --school=false  ->  报错，false不需要指定，默认为undefined
 */
program
    .command('getyou')
    .description('input user name')
    .argument('<string>', 'string to show your name')
    .option('--name <string>', 'for get your input name')
    .option('--school', 'for get your school name')
    .action((str, options) => {
        console.log('parm-string: ', str)
        console.log('param-input: ', options)
    })

program.parse()

// const options = program.opts()

// console.log('options:', options)
