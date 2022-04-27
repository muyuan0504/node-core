const fs = require('fs');

const fsWatcher = fs.watch('./file.js');

fsWatcher.on('change', (eventType, filename) => {
    console.log(eventType, filename);
});


