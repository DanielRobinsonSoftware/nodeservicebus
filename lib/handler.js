module.exports = (function() {

  return {
    create : function(messageIdentifier, handle){
      return {
        messageIdentifier : messageIdentifier,
        handle : handle
      };
    }
  };

}());