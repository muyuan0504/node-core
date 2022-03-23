const path = require('path').win32;

console.log(path.delimiter); // ;

console.log(path.basename('./readme.md', '.md')); // readme

console.log(path.dirname('./readme.md')); // .

const extnameStr = path.extname('index');
console.log(typeof extnameStr, extnameStr === ''); // string true

console.log(path.parse('C:\\path\\dir\\file\\'), 'path.parse');

console.log(path.resolve(), 'path.resolve');

console.log(path.normalize('E:\codeEntry\github\\\\node'), 'path.normalize');