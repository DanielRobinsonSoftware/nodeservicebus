module.exports = {
  create : function(messageIdentifier, payload) {
    return {
      messageIdentifier : messageIdentifier,
      payload : payload
    }
  },
  log : function(message) {
    return {
      messageIdentifier: 'Log',
      payload : message
    }
  }
}