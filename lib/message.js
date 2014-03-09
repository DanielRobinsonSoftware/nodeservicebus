module.exports = {
  createTransient : function(messageIdentifier, payload) {
    return {
      messageIdentifier : messageIdentifier,
      messageType : 'transient',
      payload : payload
    };
  }
};