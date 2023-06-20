/**
 * fs: 目录与目录条目
 *
 * <fs.Dir>: fs模块中表示【目录流】的类
 * 由 fs.opendir()、fs.opendirSync() 或 fsPromises.opendir() 创建
 * dir.path: 提供给 fs.opendir()、fs.opendirSync() 或 fsPromises.opendir() 的此目录的只读路径
 * dir.read()：异步地读取下一个目录条目，可以是文件也可以是目录, 会按照(目录|文件)名的排序读取，不存在类型的优先级
 *             以Promise的形式返回的目录条目没有操作系统底层目录机制提供的特定顺序，迭代目录时添加或删除的条目可能不包括在迭代结果中
 * dir.read(callback)：
 *             异步读取下一个目录条目，读取完成后 调用 callback
 *             读取完成后，将使用 <fs.Dirent> 或 null（如果读取不到更多的目录条目）调用 callback
 * dir.close(): 关闭目录的底层资源句柄，后续【读取-read操作】将导致错误；读取dir.path不受影响
 *
 *
 * <fs.Dirent>: fs模块中表示【目录条目】的类
 */

exports.useFsDir = async (dir) => {
    dir.path = '1' // path是只读的，修改无效，但是不会报错
    const dirPath = dir.path
    console.log('dir.path: ', dirPath)

    // 手动读取, 由于dir[Symbol.asyncIterator]() 异步迭代器逻辑 yeid关键字，当手动读取完所有dirent时，遍历读取已经没有目录返回,但不会关闭 dir
    // 如果file.text 是 a.text；那么会被首先读取
    const dirent1 = await dir.read()
    const dirent2 = await dir.read()
    const dirent3 = await dir.read()
    const dirent4 = await dir.read()
    useDirent(dirent2)
    console.log('dirent: ', dirent1, dirent2, dirent3, dirent4)

    // 遍历 for await...of循环 读取
    // try {
    //     for await (const dirent of dir) {
    //         console.log('dirent 遍历读取：', dirent)
    //         /** 下面是内部实现，【当循环迭代完成后，异步迭代器内部会自动关闭dir】 */
    //         // async* entries() {
    //         //     try {
    //         //       while (true) {
    //         //         const result = await this[kDirReadPromisified]();
    //         //         if (result === null) {
    //         //           break;
    //         //         }
    //         //         yield result;
    //         //       }
    //         //     } finally {
    //         //       await this[kDirClosePromisified](); // 在这里关闭句柄
    //         //     }
    //         //   }
    //         // }
    //         // SymbolAsyncIterator: 异步迭代器属性，通过设置该属性(也可以用[Symbol.asyncIterator]的形式)来自定义异步可迭代对象，用于for await...of循环
    //         // ObjectDefineProperty(Dir.prototype, SymbolAsyncIterator, {
    //         //   value: Dir.prototype.entries,
    //         //   enumerable: false,
    //         //   writable: true,
    //         //   configurable: true,
    //         // });
    //     }
    // } catch (err) {
    //     console.error(err)
    // }

    dir.read((err, dirent) => {
        console.log(err, dirent, '....', this)
        dir.close()
    })

    /**
     * dir.closeSync
     * 如果当前dir没有打开的 异步 操作, 没有未结束的dir.read(callback)操作，那么可以直接同步关闭目录的底层资源句柄
     * 当存在异步操作dir句柄的时候，调用 closeSync会报错, 除非丢到setTimeout(process.nextTick都不好使)中,并且延迟执行后需要保证read的callback执行完毕，
     * dir.close的操作没有限制，有异步操作时，可将close操作放到异步句柄的callback中，见上面 dir.read(callback)示例
     * 猜测是跟文件系统设置的资源锁有关。
     */
    // dir.closeSync()
    // setTimeout(() => {
    //     dir.closeSync()
    // }, 10000)

    // console.log('dirent last', restDirent)
}

/**
 * 块设备和字符设备通常是用于表示硬件设备（如硬盘、串口等）的特殊类型文件。
 */
function useDirent(dirent) {
    console.error('---------- dirent start --------------')

    console.error('name: ', dirent.name) // 文件名
    console.error('path: ', dirent.path) // 引用的基本路径
    const isBlockDevice = dirent.isBlockDevice()
    console.error('isBlockDevice 块设备校验: ', isBlockDevice)
    const isCharacterDevice = dirent.isCharacterDevice()
    console.error('isCharacterDevice 字符设备校验: ', isCharacterDevice)
    const isDir = dirent.isDirectory()
    console.error('isDirectory 是否是目录', isDir)
    const isFIFO = dirent.isFIFO()
    console.error('isFIFO 先进先出管道: ', isFIFO)
    const isFile = dirent.isFile()
    console.error('isFile 常规文件: ', isFile)
    const isSocket = dirent.isSocket()
    console.error('isSocket 是套接字socket: ', isSocket)
    const isSymbolicLink = dirent.isSymbolicLink()
    console.error('isSymbolicLink 是符号链接: ', isSymbolicLink)

    console.error('---------- dirent end --------------')
}
