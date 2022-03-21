const path = require('path').win32;

console.log(path.delimiter); // ;

console.log(path.basename('./readme.md', '.md')); // readme

console.log(path.dirname('./readme.md')); // .