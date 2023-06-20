/** nodejs-buffer模块：虽然Buffer类支持全局作用域内可用，官方建议还是显示引用它
 * 为了使 Buffer 实例的创建更可靠且不易出错，new Buffer() 构造函数的各种形式已被弃用，并由单独的 Buffer.from()、Buffer.alloc() 和 Buffer.allocUnsafe() 方法取代
 * Buffer:
 *     用于表示固定长度的字节序列, 用于直接处理二进制数据;
 *     在Buffer和字符串之间进行转换时，可以指定字符编码，如果不指定，默认使用 'utf8'
 */

const { Buffer } = require('buffer')

/** Buffer静态方法 */
console.log('Buffer.isBuffer: ', Buffer.isBuffer(Buffer.from('0'))) // true
console.log('Buffer.isBuffer: ', Buffer.isBuffer(0)) // false
console.log('Buffer.isEncoding: ', Buffer.isEncoding('utf8')) // true
console.log('Buffer.isEncoding: ', Buffer.isEncoding('utf/8')) // false

/** 构建Buffer：
 *
 * Buffer.alloc(size[, fill[, encoding]]):
 *     size: 新的 Buffer 所需的长度,
 *           如果 size 大于 buffer.constants.MAX_LENGTH 或小于 0，则抛出 ERR_INVALID_ARG_VALUE
 *     fill: 如果fill是字符串，那么字符串对应的编码就是buffer的编码, 默认值： 0
 *     encoding: 如果 fill 是字符串，则这就是它的编码; 默认值： 'utf8'
 *
 * <Buffer.from>
 * Buffer.from(array): 使用 0 范围内的 array 字节分配一个新的 Buffer – 255
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 * Buffer.from(buffer): 将传入的 buffer 数据复制到新的 Buffer 实例上
 * Buffer.from(object[, offsetOrEncoding[, length]]): object对应支持Symbol.toPrimitive或valueOf()的对象
 * Buffer.from(string[, encoding]): 创建包含 string 的新 Buffer。 encoding 参数标识将 string 转换为字节时要使用的字符编码
 *
 * 补充：
 * 在 Node.js 中，Buffer.from(array) 方法接收的 array 参数有以下限制：
 * 1. 数组元素必须是整数：array 中的每个元素必须是整数（0 到 255 之间的值）。
 *    如果数组中的元素不是整数，将会被截断为整数。例如，Buffer.from([3.14, 42]) 会被转换为 Buffer.from([3, 42])
 *    如果数组中的元素超过255，会对它们进行截断（即取模运算），将它们转换为有效的 8 位无符号整数
 *    比如数字267会得到11(十进制)，toString后是垂直制表符
 * 2. array 的最大长度受到 V8 引擎的限制，它限制了 JavaScript 数组的最大长度为约 2GB（2^31 - 1 个元素）
 * 3. 类型化数组和 DataView：array 可以是类型化数组（TypedArray）和 DataView 对象。这些对象在底层使用固定大小的内存缓冲区，因此可以直接传递给 Buffer.from()
 * 4. 字符串作为数组：array 参数可以是一个字符串，它会被视为包含字符的数组。字符串中的每个字符将被视为一个整数。
 *    例如，Buffer.from("ABC") 与 Buffer.from([65, 66, 67]) 是等效的
 */
const bfSize = 12
const fillText = 'hello world!'
const bfAlloc = Buffer.alloc(bfSize, fillText)
const bfStr = Buffer.from(fillText, 'utf-8')
// Buffer.from([65, 66, 67])得到的是一个包含ASCII值为65,66和67的字节序列的Buffer对象
// ASCII值为 65、66 和 67 分别对应字符 'A'、'B' 和 'C',所以当对Buffer对象调用toString，会得到'ABC'
const bfArray = Buffer.from([65, 66, 67])

console.log('Buffer.alloc: ', bfAlloc)
console.log('Buffer.from: ', bfStr)
console.log('Buffer.from Array: ', bfArray, bfArray.toString(), '???')

/** */
/** */
/** Buffer编解码
 * 解码Base为字节： Buffer.from(data, 'base64')，data 可以是任何可以强制转换为字符串的 JavaScript 值
 * 编码为Base64: buf.toString('base64') 将字符串解码为字节，并使用 Base64 将这些字节编码为字符串
 */
const originStr = 'what is your name ?'
const bfSet = Buffer.from(originStr)
const toByte = Buffer.from(bfSet.toString('base64'), 'base64')
console.log('Buffer编解码 原字节：', bfSet)
console.log('Buffer编解码 字节 -> base64编码: ', bfSet.toString('base64'))
console.log('Buffer编解码 base64 -> 字节：', toByte)
