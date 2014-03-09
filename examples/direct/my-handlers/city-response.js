var nsb = require('../../../');

module.exports = nsb.handler.createHandler('cityResponse', function(msg){
  console.log('received cities  '+msg.payload);
});