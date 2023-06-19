/** nodejs-buffer模块：虽然Buffer类支持全局作用域内可用，官方建议还是显示引用它
 * 为了使 Buffer 实例的创建更可靠且不易出错，new Buffer() 构造函数的各种形式已被弃用，并由单独的 Buffer.from()、Buffer.alloc() 和 Buffer.allocUnsafe() 方法取代
 * Buffer:
 *     用于表示固定长度的字节序列, 用于直接处理二进制数据;
 *     在Buffer和字符串之间进行转换时，可以指定字符编码，如果不指定，默认使用 'utf8'
 */

const { Buffer } = require('buffer')

/** 构建Buffer
 * Buffer.alloc(size[, fill[, encoding]]):
 *     size: 新的 Buffer 所需的长度, 如果 size 大于 buffer.constants.MAX_LENGTH 或小于 0，则抛出 ERR_INVALID_ARG_VALUE
 *     fill: 如果fill是字符串，那么字符串对应的编码就是buffer的编码, 默认值： 0
 *     encoding: 如果 fill 是字符串，则这就是它的编码; 默认值： 'utf8'
 * Buffer.
 */
const bfSize = 12
const bfFill = 'hello world!'
const bf1 = Buffer.alloc(bfSize, bfFill)
const bfStr = Buffer.from(bfFill, 'utf-8')

console.log(bfStr.byteLength, '---', bfStr.length)
console.log(bfStr.toString(), bf1.toString())
