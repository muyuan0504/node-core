const fs = require('fs')
const stream = require('stream')
// const file = fs.createWriteStream('./big.file')
// for (let i = 0; i <= 1e6; i++) {
//     file.write('jimous is cool !!! \n')
// }
// file.end()

// 打开一个可读流
const file = fs.createReadStream('./test.txt', 'utf-8')
file.on('readable', (chunk) => {
    console.log('data:', chunk, file.read())
})

console.log(file.destroyed, file.isPaused(), file.readable, file.readableLength);

file.on('end', function () {
    console.log('END')
})

file.on('close', function () {
    console.log('close')
    file.destroy()
})

file.on('error', function (err) {
    console.log('error:', err)
})

// file.destroy('关闭流')

console.log(file.destroyed);