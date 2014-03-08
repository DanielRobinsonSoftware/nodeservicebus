module.exports = {
  messageType: 'Log',
  handle: function (message) {
    console.log(message.payload);
  }
};