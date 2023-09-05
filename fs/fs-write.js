/** 文件写操作 */

exports.fileHandle = {
    async appendFile(fileHandle) {
        /** filehandle.appendFile(data[, options])
         * data: <string> | <Buffer> | <TypedArray> | <DataView> | <AsyncIterable> | <Iterable> | <Stream>
         * options: encoding <string> | <null> 默认值： 'utf8'
         */
        await fileHandle.appendFile('满堂花醉三千客','utf8')
    },
}
