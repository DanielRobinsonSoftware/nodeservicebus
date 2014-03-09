var service = require('../lib/service'),
    message = require('../lib/message'),
    handlers = require('./handlers');

service('Query Service', handlers, function(bus){
  bus.send(message.createTransient('cityQuery', 'UK'));
});