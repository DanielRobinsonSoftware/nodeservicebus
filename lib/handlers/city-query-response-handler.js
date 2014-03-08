module.exports = {
  messageType: 'CitiesQueryResponse',
  handle: function (message) {
    console.log('got cities: ', message.payload);
  }
};