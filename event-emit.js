const { EventEmitter } = require('events');

eventEmit = new EventEmitter();

eventEmit.on('jimous', (msg) => {
    console.log(msg);
});

eventEmit.emit('jimous', 'jimous is cool');
