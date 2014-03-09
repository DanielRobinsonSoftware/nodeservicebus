var redmess = require('redmess');
var messageTypes = require('./message').messageTypes;

module.exports = (function(){

  var config = {
    port: 6379,
    host: 'localhost'
  };
  var registry = [];
  var pipe = 'bus';

  var channel = new redmess.Subscriber(config, 'main_subscriber', pipe);
  var bus = new redmess.Publisher(config, 'main_publisher');

  var handle = function(msg) {
    registry.forEach(function (handler) {
      if (handler.messageIdentifier === msg.messageIdentifier) {
        handler.handle(msg, {send:send});
      }
    });
  };

  var send = function (message) {
    if (message.messageType === messageTypes.transient) {
      handle(message);
    } else if(message.messageType === messageTypes.queued) {
      bus.publish(pipe, 'message', message);
    }
  };

  var receiveMessage = function (data) {
    var msg = data.msg;
    handle(msg);
  };

  var init = function (callback) {
    channel.on('default', receiveMessage);
    channel.next();
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

  return {
    init: init,
    send: send,
    register: register,
    registry: registry
  };

}());
