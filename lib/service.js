var bus = require('./bus');

bus.init(function(){

  bus.register(require('./handlers'));
  bus.register(require('./handlers/city-query-response-handler'));

  bus.send({ messageType : 'Log', payload : 'Service 1 online'});

  setInterval(function(){
    bus.send({ messageType : 'CitiesQuery', payload : { country : 'UK' }});
  },1000);

});