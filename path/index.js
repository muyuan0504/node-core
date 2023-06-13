/** nodejs-path模块 */
const path = require('path')

const pathMethods = []
const pathProperty = []
Object.keys(path).forEach((param) => {
    const pathKey = path[param]
    if (typeof pathKey === 'function') {
        pathMethods.push(param)
    } else {
        pathProperty.push(param)
    }
})
console.log('path-method: ', JSON.stringify(pathMethods))
console.log('path-property: ', pathProperty)

require('./property.js')
require('./methods.js')
