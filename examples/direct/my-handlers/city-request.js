var nsb = require('../../../');

module.exports = nsb.handler.createHandler('cityRequest', function(msg, bus){
  console.log('received cities request for '+msg.payload);

  var responseMessage = nsb.message.createDirect('cityResponse', ['London', 'Manchester', 'Birmingham']);
  bus.send(responseMessage);
});