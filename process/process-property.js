const process = require('process')

const pID = process.pid
console.log('pid: ', pID)

/** ppid: 当前进程的父进程pid */
const ppID = process.ppid
console.log('ppid: ', ppID)

/** 进程标题 */
const pTitle = process.title
console.log('title: ', pTitle)

/** 进程的内存使用量 */
const pMemoryUse = process.memoryUsage()
console.log('memoryUsage: ', pMemoryUse)

const pMemoryUseRss = process.memoryUsage.rss()
console.log('memoryUsage.rss: ', pMemoryUseRss)

const pResourceUse = process.resourceUsage
console.log('resourceUsage: ', pResourceUse)
