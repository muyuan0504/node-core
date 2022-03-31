const { MessageChannel } = require('worker_threads');

const { port1, port2 } = new MessageChannel();

module.exports = {
    port3: port1,
    port4: port2,
};
