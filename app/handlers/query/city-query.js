var handler = require('../../../lib/handler'),
    message = require('../../../lib/message');

module.exports = handler.create('cityQuery', function(msg, bus){
  var responseCities = ['London', 'Luton'];
  bus.send(message.createTransient('cityQueryResponse', responseCities));
});