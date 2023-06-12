/** nodejs-procee进程模块 */
const process = require('process')

const processMethods = []
const processProperty = []
Object.keys(process).forEach((param) => {
    const processKey = process[param]
    if (typeof processKey === 'function') {
        processMethods.push(param)
    } else {
        processProperty.push(param)
    }
})

console.log('processMethods: ', JSON.stringify(processMethods), '\n')

console.log('processProperty: ', JSON.stringify(processProperty), '\n')

require('./process-property')
