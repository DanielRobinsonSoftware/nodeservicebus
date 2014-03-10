var bus = require('./bus');

exports.createService = function(identifier, customHandlers, onStart) {
  bus.init(function() {
    bus.register(customHandlers);
    console.log(identifier + ' is online');
    onStart(bus);
  });
};
