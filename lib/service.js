var bus = require('./bus'),
    message = require('./message');

module.exports = function(identifier, customHandlers, onStart) {

  bus.init(function(){

    bus.register(require('./handlers'));
    bus.register(customHandlers);

    bus.send(message.log('Service '+ identifier +' online'));

    onStart(bus);

  });

};