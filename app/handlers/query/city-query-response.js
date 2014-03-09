var handler = require('../../../lib/handler');

module.exports = handler.create('cityQueryResponse', function(msg){
  console.log('Cities received ' + msg.payload);
});