var nsb = require('../../'),
    myHandlers = require('./my-handlers');

nsb.service.createService('my service', myHandlers, function(bus) {
  var message = nsb.message.createDirect('cityRequest', 'UK');
  bus.send(message);
});