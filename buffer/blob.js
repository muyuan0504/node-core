const { Blob } = require('buffer')

/** new Blob: 创建新的 Blob 对象，其中包含给定源的串接
 * new buffer.Blob([sources[, options]])
 *  <string[]> | <ArrayBuffer[]> | <TypedArray[]> | <DataView[]> | <Blob[]>
 */

const blobString = new Blob(['hello blob !', 'hahah'])
const blobSize = blobString.size
const blobType = blobString.type

console.log('one blob: ', blobString)
console.log('blob size: ', blobSize)
console.log('blob type: ', typeof blobType)

const blobArray = new Blob([blobString])
const isBlobType = blobArray.type
console.log('blob type: ', typeof isBlobType)

blobString.text().then((res) => {
    console.error('---------- aiden --------------', res)
})
