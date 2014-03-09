module.exports = (function() {

  return {
    createHandler : function(messageIdentifier, handle){
      return {
        messageIdentifier : messageIdentifier,
        handle : handle
      };
    }
  };

}());