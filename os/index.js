const os = require('os')

/**
 * EOL: 操作系统特定的行尾标记, POSIX 上是 \n; Windows 上是 \r\n ;
 * arch(): 返回为其编译 Node.js 二进制文件的操作系统 CPU 架构。 可能的值为 'arm'、'arm64'、'ia32'、'mips'、'mipsel'、'ppc'、'ppc64'、's390'、's390x'、以及 'x64';
 * devNull: 空设备的特定于平台的文件路径, Windows 上是 \\.\nul; POSIX 上是 /dev/null
 * freemem(): 以整数形式返回空闲的系统内存量（以字节为单位）
 * totalmem(): 以整数形式返回系统内存总量（以字节为单位）
 * platform(): 返回标识为其编译 Node.js 二进制文件的操作系统平台的字符串, 值相当于 process.platform;可能的值为 'aix'、'darwin'、'freebsd'、'linux'、'openbsd'、'sunos'、以及 'win32'
 * release(): 返回操作系统版本
 * tmpdir(): 以字符串形式返回操作系统默认的临时文件的目录
 * type():  返回的操作系统名称
 * version(): 返回标识内核版本的字符串
 *
 * cpus(): 返回包含有关每个逻辑 CPU 内核的信息的对象数组。 如果没有可用的 CPU 信息，例如 /proc 文件系统不可用，则该数组将为空
 */

// console.log('os constants: ', os.constants)
console.log('os EOL: ', os.EOL)
console.log('os arch: ', os.arch())
console.log('os devNull: ', os.devNull)
console.log('os freemem: 空闲的系统内存量: ', parseInt(os.freemem() / 1024 / 1024 / 1024) + 'G')
console.log('os totalmem: 系统内存总量: ', parseInt(os.totalmem() / 1024 / 1024 / 1024) + 'G')
console.log('os platform: ', os.platform())
console.log('os release: ', os.release())
console.log('os tempdir: ', os.tmpdir())
console.log('os type: ', os.type())
console.log('os version: ', os.version())

const cpusInfo = os.cpus()
/** 返回的每个cpu对象包含以下信息：
 * mode: cpu版本
 * speed：时钟频率 单位: M
 * time: <Object>
 * time.user <number> CPU 在用户模式下花费的毫秒数;
 * time.nice <number> CPU 在良好模式下花费的毫秒数; nice 值仅适用于 POSIX。 在 Windows 上，所有处理器的 nice 值始终为 0
 * time.sys <number> CPU 在系统模式下花费的毫秒数;
 * time.idle <number> CPU 在空闲模式下花费的毫秒数;
 * time.irq <number> CPU 在中断请求模式下花费的毫秒数.
 */
console.log('os cpus: ', cpusInfo.length, cpusInfo[0])

console.log(os.release())
