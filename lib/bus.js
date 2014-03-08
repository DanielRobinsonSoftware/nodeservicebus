var zmq = require('zmq'),
    pub = zmq.socket('pub'),
    sub = zmq.socket('sub');

var registry = [];

module.exports = {
  init : function(port){
    pub.bindSync(port);
    sub.connect(port);
    sub.subscribe('');
    sub.on('message', function(msg){
      var parsedMsg = JSON.parse(msg);
      registry.forEach(function(handler){
        if(handler.messageType === parsedMsg.messageType) {
          handler.handle(msg.toString());
        }
      });
    });
  },
  send : function(message) {
    pub.send(JSON.stringify(message));
  },
  register : function(handler) {
    registry.push(handler);
  }
};