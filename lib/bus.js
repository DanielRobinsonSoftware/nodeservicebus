var redmess = require('redmess');
var messageTypes = require('./message').messageTypes;
var config = require('./config');

var registry = [];
var pipe = 'bus';
var channel = new redmess.Subscriber(config, 'main_subscriber', pipe);
var bus = new redmess.Publisher(config, 'main_publisher');

var send = exports.send = function(message) {
  if (message.messageType === messageTypes.transient) {
    handle(message);
  } else if (message.messageType === messageTypes.queued) {
    bus.publish(pipe, 'message', message);
  }
};

exports.init = function(callback) {
  channel.on('default', receiveMessage);
  channel.next();
  callback();
};

exports.register = function(handler) {
  if (handler instanceof Array) {
    handler.forEach(function(h) {
      registry.push(h);
    });
  } else {
    registry.push(handler);
  }
};

exports.registry = registry;

function handle(msg) {
  registry.forEach(function (handler) {
    if (handler.messageIdentifier === msg.messageIdentifier) {
      handler.handle(msg, {send: send});
    }
  });
}

function receiveMessage(data) {
  var msg = data.msg;
  handle(msg);
}
