var redmess = require('redmess')
    , messageTypes = require('./message').messageTypes
    , config = {
      port: 6379,
      host: 'localhost'
    }
    , registry = []
    , pipe = 'bus';

var registry = [];
var aSubscriber = new redmess.Subscriber(config, 'main_subscriber', pipe);
var aPublisher = new redmess.Publisher(config, 'main_publisher');

var send = function (message) {
  if (message.messageType === messageTypes.transient) {
    aPublisher.publish(pipe, 'message', message);
  }
};

var receiveMessage = function (data) {
  registry.forEach(function (handler) {
    if (handler.messageIdentifier === data.msg.messageIdentifier) {
      handler.handle(data.msg, {
        send: send
      });
    }
  });
};

var init = function (callback) {
  aSubscriber.on('default', receiveMessage);
  aSubscriber.next();
  callback();
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