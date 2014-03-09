module.exports = {
  create : function(messageIdentifier, handle){
    return {
      messageIdentifier : messageIdentifier,
      handle : handle
    };
  }
};