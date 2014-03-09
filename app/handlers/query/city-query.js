var handler = require('../../../lib/handler'),
    message = require('../../../lib/message');

module.exports = handler.create('cityQuery', function(msg, bus){
  bus.send(message.create('Log', 'Looking for cities in '+msg.payload));
  var responseCities = ['London', 'Luton'];
  bus.send(message.create('cityQueryResponse', responseCities));
});