exports.createHandler = function(messageIdentifier, handle) {
  return {
    messageIdentifier: messageIdentifier,
    handle: handle
  };
};
