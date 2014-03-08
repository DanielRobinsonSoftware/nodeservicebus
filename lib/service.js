var port = 'tcp://127.0.0.1:5555',
    bus = require('./bus');

var messageHandlerA = {
    messageType : 'A',
    handle : function(message) {
      console.log(message);
    }
};

var messageHandlerB = {
  messageType : 'B',
  handle : function(message) {
    console.log(message);
  }
};

bus.register(messageHandlerA);
bus.register(messageHandlerB);

bus.init(port);

bus.send({ messageType : 'A', payload : 'Hello world A'});
bus.send({ messageType : 'B', payload : 'Hello world B'});