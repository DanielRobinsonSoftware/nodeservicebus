var handler = require('../handler')

module.exports = handler.create('Log', function (message) {
    console.log(message.payload);
  });