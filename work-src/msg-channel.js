const { MessageChannel } = require('worker_threads');

const { port1, port2 } = new MessageChannel();

module.exports = {
    port1,
    port2,
};
