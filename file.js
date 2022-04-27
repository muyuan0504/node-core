const { open, close, appendFile, ...fs } = require('fs')
// const Buffer = require('buffer')
// const buf = Buffer.from('hello world', 'utf8')
/**
 * fd -> 表示文件描述符的整数
 */
open('./test.txt', 'r+', (err, fd) => {
    if (!err) {
        console.log(fd)
        fs.writeFile(fd, '测试一下', (err) => {
            console.log(err, 'fs.write');
        })
        // fs.readv(fd, buf, (err, bytesRead, buffers) => {
        //     console.log(err, bytesRead, buffers)
        // })
        // fs.read(fd, (err, bytesRead , buffer) => {
        //     console.log(err, bytesRead, buffer)
        // })
        // appendFile(fd, 'yes, he is', 'utf-8', (err) => {
        //     close(fd, (err) => {
        //         err && console.log(err, '关闭fd失败')
        //     })
        // })
        // fs.fstat(fd, (err, stats) => {
        //     console.log(err, stats)
        //     fs.futimes(fd, stats.atime, new Date('2022-03-29T03:38:18.406Z'), (err) => {
        //         console.log(err)
        //         fs.fstat(fd, (err, stats) => {
        //             console.log(err, stats, '改后')
        //             close(fd, (err) => {
        //                 console.log(err)
        //             })
        //         })
        //     })
        // })
        // fs.ftruncate(fd, 25, (err) => {
        //     console.log(err)
        // })
    }
})

// fs.copyFile('./test.txt', './test-backup.txt', (err) => {
//     console.log(err)
// })

// fs.cp('./src1', './src2', (err) => {
//     console.log(err)
// })

fs.exists('./test3.txt', (err) => {
    console.log(err) // false, 不存在该文件
})

// fs.lstat('./src1', (err, stats) => {
//     console.log(err, stats, '000000000')
// })

// fs.opendir('./src1', (err, stats) => {
//     console.log(err, stats)
// })

fs.readdir('./src2', (err, files) => {
    console.log(err, files)
    
})

fs.readFile('./test.txt', 'utf-8', (err, data) => {
    console.log(err, data)
})

// fs.readlink('./src1/test.txt.lnk', (err, link) => {
//     console.log(err, link, '符号链接')
// })
fs.realpath('./src', (err, path) => {
    console.log(path, 'fs.realpath');
})

// fs.rename('./test9.txt', './test99.txt', (err) => {
//     console.log(err, 'fs.rename');
// })

// fs.rm('./src4', (err) => {
//     console.log(err, '删除了');
// })

// fs.stat('./src2', (err, data) => {
//     console.log(err, data, 'fs.stat');
// })

// fs.symlink('./test.txt', './mewtwo.txt', 'file',  (err) => {
//     console.log('fs.symlink', err);
// });


// fs.unlink('./src4',  (err) => {
//     console.log('fs.unlink', err);
// });
