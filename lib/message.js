module.exports = (function () {

  var messageTypes = {transient : 'transient', queued : 'queued'};

  var createBasicMessage = function(messageIdentifier, messageType, payload) {
    return {
      messageIdentifier: messageIdentifier,
      messageType: messageType,
      payload: payload
    };
  };

  return {
    createDirect: function (messageIdentifier, payload) {
      return createBasicMessage(messageIdentifier, messageTypes.transient, payload);
    },
    createQueued: function (messageIdentifier, payload) {
      return createBasicMessage(messageIdentifier, messageTypes.queued, payload);
    },
    messageTypes : messageTypes
  };

}());