var pubsub = require('redis-pubsub'),
    messageTypes = require('./message').messageTypes;

var registry = [];
var channel = pubsub.createChannel(6379, 'localhost', 'foobar');

var send = function (message) {
  if(message.messageType === messageTypes.transient) {
    channel.send(JSON.stringify(message), function () {});
  }
};

var receiveMessage = function(msg) {
  var parsedMsg = JSON.parse(msg);
  registry.forEach(function (handler) {
    if (handler.messageIdentifier === parsedMsg.messageIdentifier) {
      handler.handle(JSON.parse(msg), {
        send : send
      });
    }
  });
};

var init = function (callback) {
  channel.on('ready', function () {
    channel.on('message', receiveMessage);
    callback();
  });
};

var register = function (handler) {
  if (handler instanceof Array) {
    handler.forEach(function (h) {
      registry.push(h);
    });
  } else {
    registry.push(handler);
  }
};

module.exports = {
  init: init,
  send: send,
  register: register
};