/**
 * 驻留集: 给一个进程分配的物理页框的集合就是这个进程的驻留集
 */
const process = require('process')

/** 进程应用属性
 * pid: 进程id
 * ppid: 当前进程的父进程pid
 * title: 进程标题
 * execPath: 启动nodejs进程可执行文件的绝对路径
 */
const { pid, ppid, title, execPath } = process

console.log('pid: ', pid)
console.log('ppid: ', ppid)
console.log('title: ', title)
console.log('execPath: ', execPath)

/** 进程配置相关
 * config: 执行文件的配置选项，包含用于编译当前nodejs可执行文件的配置选项的js表示
 * exitCode: 设置进程退出code码，当进程正常退出或通过 process.exit() 退出而不指定代码时，将作为进程退出码的数字
 * traceDeprecation: 是否启动进程时设置了--trace-deprecation标志，开启方式eg: node --trace-deprecation index.js
 * throwDeprecation: 是否启动进程时设置了--throw-deprecation标志
 * noDeprecation: 是否启动进程时设置了--no-deprecation标志
 * release: 当前node版本相关的元数据
 * argv: 启动nodejs进程时传入的命令行参数，第一个元素将是 process.execPath
 * argv0: nodejs启动时传入的argv[0]原始值的只读副本
 * execArgv: nodejs进程启动时传入的一组特定于Nodejs的命令行选项。eg: --throw-deprecation --trace-warnings等
 */
process.exitCode = 1001
const { config, exitCode, traceDeprecation, throwDeprecation, noDeprecation, release } = process
const { argv, argv0, execArgv } = process
console.log('config [key]: ', Object.keys(config))
console.log('exitCode: ', exitCode)
console.log('traceDeprecation: ', traceDeprecation)
console.log('throwDeprecation: ', throwDeprecation)
console.log('noDeprecation: ', noDeprecation)
console.log('release [key]: ', Object.keys(release))
console.log('argv: ', JSON.stringify(argv))
console.log('argv0: ', argv0, typeof argv0) // string
console.log('execArgv: ', execArgv)
return

/** 进程系统属性
 * arch: cpu架构 'arm','x64'...
 * debugPort: nodejs调试器使用的端口
 * platform: 操作系统平台
 * env: 用户环境对象
 * allowedNodeEnvironmentFlags: 该属性是NODE_OPTIONS环境变量中允许的特殊的只读Set标志
 * version: nodejs版本字符串
 * versions: nodejs版本字符串及其相关项
 *
 */
const { arch, debugPort, platform, env, allowedNodeEnvironmentFlags, version, versions } = process

console.log('arch: ', arch)
console.log('debugPort: ', debugPort)
console.log('platform: ', platform)
console.log('env', Object.keys(env))
console.log('allowedNodeEnvironmentFlags: ', allowedNodeEnvironmentFlags)
console.log('version: ', version)
console.log('versions: ', versions)
