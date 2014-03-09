var service = require('../lib/service'),
    message = require('../lib/message');

var handlers = [
  require('./handlers/query/city-query'),
  require('./handlers/query/city-query-response')
];

service('Query Service', handlers, function(bus){
  bus.send(message.createTransient('cityQuery', 'UK'));
});