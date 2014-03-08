module.exports = {
  messageType: 'CitiesQuery',
  handle: function (message, bus) {
    console.log('fetching cities for country: ', message.payload.country);
    bus.send({messageType : 'CitiesQueryResponse', payload : ['London', 'Luton']});
  }
};