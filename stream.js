const fs = require('fs')
// const file = fs.createWriteStream('./big.file')
// for (let i = 0; i <= 1e6; i++) {
//     file.write('jimous is cool !!! \n')
// }
// file.end()

// 打开一个可读流
const file = fs.createReadStream('./test.txt', 'utf-8')
file.on('data', (chunk) => {
    console.log('data:', chunk)
})

file.on('end', function () {
    console.log('END')
})
