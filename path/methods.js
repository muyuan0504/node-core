const path = require('path')
const { red } = require('colorette')

console.log(red('-----path method-----start'))
/** resolve(path)：将路径或路径片段的序列解析为绝对路径；不带参数直接返回当前工作目录的绝对路径 */
const pathResolve = path.resolve(__dirname, 'src')
console.log('resolve: ', pathResolve)

/** normalize: 规范化给定的path */
const pathNormalize = path.normalize('D:\\github\\\\node\\path')
console.log('normalize: ', pathNormalize)

/** isAbsolute：判断path是否为绝对路径 */
const pathAbsolute = path.isAbsolute('./index.js')
console.log('isAbsolute: ', pathAbsolute)

/** join([...paths])：使用特定于平台的分隔符作为定界符将所有给定的path片段连接在一起，然后规范化生成的路径 */
const pathJoin = path.join(__dirname, 'src', './index.js')
console.log('join: ', pathJoin)

/** .relative(from, to)：返回从from到to的相对路径；如果from和to都解析为相同路径，则返回零长度的字符串 */
const pathRelative = path.relative('C:\\file\\image\\aaa', 'C:\\file\\src\\index.js')
console.log('relative: ', pathRelative)

/** toNamespacedPath： 此方法仅在windows系统上有意义 */
const pathNameSpace = path.toNamespacedPath(__dirname, './index.js')
console.log('toNamespacedPath: ', pathNameSpace)

const pathDirname = path.dirname('./src/image/a.png')
console.log('dirname: ', pathDirname)

/** .basename(path) 返回path的最后一部分，如果带上了ext扩展名，则返回不带扩展名的文件名称 */
const pathBasename = path.basename('./src/aa.js', '.js')
console.log('basename: ', pathBasename)

const pathExtname = path.extname('index.html')
console.log('extname: ', pathExtname)

const pathParse = path.parse('./src/image/a.png')
console.log('parse: ', pathParse)

const pathDesc = {
    root: 'D:\\',
    dir: 'D:\\src\\image',
    base: 'a.png',
    ext: '.png',
    name: 'a',
}
const pathFormat = path.format(pathDesc)
console.log('format: ', pathFormat)

console.log(red('-----path method-----end'))
