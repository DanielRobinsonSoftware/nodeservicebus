module.exports = (function() {

  var config = {
    port: 6379,
    host: 'localhost'
  };

  if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    config.port = rtg.port;
    config.host = rtg.hostname;
  }

  return config;

}());