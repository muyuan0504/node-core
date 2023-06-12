const path = require('path')
const { blue } = require('colorette')

console.log(blue('-----path property-----start'))

const pathSep = path.sep
console.log('sep: ', pathSep)

/** delimiter：获取系统平台的路径定界符属性，windows -> ;   POSIX -> : */
const pathDelimiter = path.delimiter
console.log('delimiter: ', pathDelimiter)

/** path.win32 提供windows系统对path方法特定实现的访问 */
const win32 = path.win32
console.log('win32: ', JSON.stringify(Object.keys(win32)))

/** path.posix 提供POSIX(可移植操作系统)对path方法特定实现的访问 */
const posix = path.posix
console.log('posix: ', JSON.stringify(Object.keys(posix)))

console.log(blue('-----path property-----end'))
