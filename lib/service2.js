var bus = require('./bus');

bus.init(function(){

  bus.register(require('./handlers'));
  bus.register(require('./handlers/city-query-handler'));

  bus.send({ messageType : 'Log', payload : 'Service 2 online'});

});