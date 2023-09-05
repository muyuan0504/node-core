/** nodejs-buffer模块：虽然Buffer类支持全局作用域内可用，官方建议还是显示引用它
 * 为了使 Buffer 实例的创建更可靠且不易出错，new Buffer() 构造函数的各种形式已被弃用，并由单独的 Buffer.from()、Buffer.alloc() 和 Buffer.allocUnsafe() 方法取代
 * Buffer:
 *     用于表示固定长度的字节序列, 用于直接处理二进制数据;
 *     在Buffer和字符串之间进行转换时，可以指定字符编码，如果不指定，默认使用 'utf8'
 */

const { Buffer } = require('buffer')

/** 构建Buffer -> 常用方法：new Buffer, alloc, from
 * 
 * 安全创建和常规创建，区别在于是否在新分配Buffer实例在创建时
 * 
 * New Buffer: 在 Node.js 6.0.0 之前的版本中，Buffer 实例是使用 Buffer 构造函数创建的，它根据提供的参数以不同的方式分配返回的 Buffer：
 *   将数字作为第一个参数传给 Buffer()（例如 new Buffer(10)）会分配指定大小的新 Buffer 对象
 *   传入字符串、数组或 Buffer 作为第一个参数会将传入的对象的数据复制到 Buffer
 *   传入 ArrayBuffer 或 SharedArrayBuffer 返回 Buffer，它与给定的数组缓冲区共享分配的内存
 * 由于 new Buffer() 的行为因第一个参数的类型而异，因此当未执行参数验证或 Buffer 初始化时，可能会无意中将安全性和可靠性问题引入到应用中,例如接收的实例化参数'100'变为100，增加了缓冲区分配消耗
 * 为了使 Buffer 实例的创建更可靠且更不容易出错，new Buffer() 构造函数的各种形式已被 deprecated 替换为单独的 Buffer.from()、Buffer.alloc() 和 Buffer.allocUnsafe() 方法
 *
 * Buffer.alloc(size[, fill[, encoding]]):
 *     <申明并创建一块buffer内存区>
 *     size: 新的 Buffer 所需的长度，单位是字节；超出字节长度的数据不会保留，会截断填充字符串，以适应指定的字节大小
 *           如果 size 大于 buffer.constants.MAX_LENGTH 或小于 0，则抛出 ERR_INVALID_ARG_VALUE
 *           buffer.constants.MAX_LENGTH： 在 32 位架构上，该值当前为 230 - 1（约 1 GiB）;在 64 位架构上，该值当前为 232 （大约 4 GiB）)
 *     fill: 如果fill是字符串，那么字符串对应的编码就是buffer的编码, 默认值： 0 , 如果 fill 为 undefined，则 Buffer 将被填零
 *     encoding: 如果 fill 是字符串，则这就是它的编码; 默认值： 'utf8'
 *
 * Buffer.allocUnsafe(size)：以这种方式创建的 Buffer 实例的底层内存没有被初始化; 新创建的 Buffer 的内容未知，可能包含敏感数据；使用 Buffer.alloc() 来用零初始化 Buffer 实例。
 *
 * Buffer.allocUnsafeSlow(size)：以这种方式创建的 Buffer 实例的底层内存没有被初始化。 新创建的 Buffer 的内容未知，可能包含敏感数据。 使用 buf.fill(0) 用零初始化此类 Buffer 实例
 *
 * Buffer.from： 从已有的数据中创建一个buffer内存区
 * Buffer.from(array): 使用 0 范围内的 array 字节分配一个新的 Buffer – 255
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 * Buffer.from(buffer): 将传入的 buffer 数据复制到新的 Buffer 实例上
 * Buffer.from(object[, offsetOrEncoding[, length]]): object对应支持Symbol.toPrimitive或valueOf()的对象
 * Buffer.from(string[, encoding]): 创建包含 string 的新 Buffer。 encoding 参数标识将 string 转换为字节时要使用的字符编码
 *
 * buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])：将数据从 buf 的区域复制到 target 的区域，即使 target 内存区域与 buf 重叠
 *   target <Buffer> | <Uint8Array> 要复制到的 Buffer 或 Uint8Array
 *   targetStart <integer> target 内开始写入的偏移量。 默认值： 0
 *   sourceStart <integer> buf 内开始复制的偏移量。 默认值： 0
 *   sourceEnd <integer> buf 内停止复制的偏移量（不包括）。 默认值： buf.length
 * 返回： <integer> 复制的字节数
 *
 * buf.fill(value[, offset[, end]][, encoding])：返回： <Buffer> buf 的引用
 *   用指定的 value 填充 buf。 如果没有给定 offset 和 end，则整个 buf 都会被填满，不管当前buf是否有内容
 *   offset <integer> 在开始填充 buf 之前要跳过的字节数。 默认值： 0
 *   end <integer> 停止填充 buf（不包括在内）的位置。 默认值： buf.length
 *
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

console.log('new Buffer', new Buffer(12).fill('A').toString(), new Buffer('AAA').toString())

const bfSize = 12
const fillText = 'hello world!'
const bfAlloc = Buffer.alloc(bfSize, fillText)
const bfAllocUnsafe = Buffer.allocUnsafe(10)
bfAllocUnsafe.fill('aiden5')
const bfStr = Buffer.from(fillText, 'utf-8')
// Buffer.from([65, 66, 67])得到的是一个包含ASCII值为65,66和67的字节序列的Buffer对象
// ASCII值为 65、66 和 67 分别对应字符 'A'、'B' 和 'C',所以当对Buffer对象调用toString，会得到'ABC'
const bfArray = Buffer.from([65, 66, 67])

const bufCopy = Buffer.from(fillText)
const targetLen = bfAllocUnsafe.byteLength
const sourceLen = bufCopy.byteLength
const copyLen = bufCopy.copy(bfAllocUnsafe, 0, 4, sourceLen)
console.log('bufCopy: ', bufCopy.byteLength, bufCopy.toString(), targetLen, sourceLen)
console.log('copyLen: ', copyLen, bfAllocUnsafe.toString())
bufCopy.fill('1', 8, sourceLen)
console.log('fill', bufCopy.toString())

console.log('Buffer.byteLength', bfAlloc.byteLength)
console.log('Buffer.alloc: ', bfAlloc)
console.log('Buffer.allocUnsafe', bfAllocUnsafe.toString())
console.log('Buffer.from: ', bfStr)
console.log('Buffer.from Array: ', bfArray, bfArray.toString(), '???')

/** Buffer静态方法 */
console.log('Buffer.isBuffer: ', Buffer.isBuffer(Buffer.from('0'))) // true
console.log('Buffer.isBuffer: ', Buffer.isBuffer(0)) // false
console.log('Buffer.isEncoding: ', Buffer.isEncoding('utf8')) // true
console.log('Buffer.isEncoding: ', Buffer.isEncoding('utf/8')) // false

/** */
/** */
/** Buffer编解码
 * 解码Base为字节： Buffer.from(data, 'base64')，data 可以是任何可以强制转换为字符串的 JavaScript 值
 * 编码为Base64: buf.toString('base64') 将字符串解码为字节，并使用 Base64 将这些字节编码为字符串
 */
const originStr = 'what is your name ?'
const bfSet = Buffer.from(originStr)
const buffToString = bfSet.toString('base64')
const toByte = Buffer.from(buffToString, 'base64')
console.log('Buffer编解码 原字节：', bfSet)
console.log('Buffer编解码 字节 -> base64编码: ', buffToString)
console.log('Buffer编解码 base64 -> 字节：', toByte)

/** buf.compare： buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])
 *  将 buf 与 target 进行比较并返回数字，该数字指示 buf 在排序顺序中是在 target 之前、之后还是与 target 相同。 比较基于每个 Buffer 中的实际字节序列
 *  如果 target 与 buf 相同，则返回 0
 *  如果排序时 target 应该在 buf 之前，则返回 1
 *  如果排序时 target 应该在 buf 之后，则返回 -1
 */
const buf1 = Buffer.from('1234')
const buf2 = Buffer.from('0123')
const arr = [buf1, buf2]

console.log(arr.sort(Buffer.compare), buf1.compare(buf2))
