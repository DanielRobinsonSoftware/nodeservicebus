# NodeServiceBus

This project is currently in development and in very early stages. You are welcome to have a play around and offer suggestions.

## Documentation

## About

Nodeservicebus aims to provide you with a service host that you can clone in process (with something like [cluster](http://nodejs.org/api/cluster.html) or on many different machines.
You can use it inside express apps or as standalone processes.

It uses Redis PubSub with a reliable persistence mechanism, which means that messages will be queued until service hosts come back online.
The main concept around Nodeservicebus is the 'Command' and 'CommandHandler' pattern, but renamed slightly to be more of a 'Message' and 'MessageHandler' pattern.
You send messages around the system and one or many handlers will respond. Handlers can also send messages. Everything is Event driven and non-blocking.

### Install
+ Install Redis. Support for RedisToGo has been implemented but not yet tested.
+ npm install nodeservicebus --save
+ start coding!

## Examples

### Direct Transport
my-service.js

  var nsb = require('nodeservicebus'),
      myHandlers = require('./my-handlers');

  nsb.service.createService('my service', myHandlers, function(bus) {
    var message = nsb.message.createDirect('cityRequest', 'UK');
    bus.send(message);
  });

city-request.js

  var nsb = require('nodeservicebus');

  module.exports = nsb.handler.createHandler('cityRequest', function(msg, bus){
    console.log('received cities request for '+msg.payload);

    var responseMessage = nsb.message.createDirect('cityResponse', ['London', 'Manchester', 'Birmingham']);
    bus.send(responseMessage);
  });

city-response.js

  var nsb = require('nodeservicebus');

  module.exports = nsb.handler.createHandler('cityResponse', function(msg){
    console.log('received cities  '+msg.payload);
  });

output:

  my service is online
  received cities request for UK
  received cities  London,Manchester,Birmingham

### Queued Transport

my-service.js

  var nsb = require('nodeservicebus'),
      myHandlers = require('./my-handlers');

  nsb.service.createService('my service', myHandlers, function(bus) {
    var message = nsb.message.createQueued('cityRequest', 'UK');
    bus.send(message);
  });

city-request.js

  var nsb = require('nodeservicebus');

  module.exports = nsb.handler.createHandler('cityRequest', function(msg, bus){
    console.log('received cities request for '+msg.payload);

    var responseMessage = nsb.message.createQueued('cityResponse', ['London', 'Manchester', 'Birmingham']);
    bus.send(responseMessage);
  });

city-response.js

  var nsb = require('nodeservicebus');

  module.exports = nsb.handler.createHandler('cityResponse', function(msg){
    console.log('received cities  '+msg.payload);
  });

output:

  my service is online
  SUCCESS: PUBLISHER:main_publisher RESULT:1 CHANNEL:message TIMESTAMP:1394362145399
  received cities request for UK
  SUCCESS: SUBSCRIBER:main_subscriber RESULT:Received Message on Default CHANNEL:message TIMESTAMP:1394362145399
  SUCCESS: PUBLISHER:main_publisher RESULT:1 CHANNEL:message TIMESTAMP:1394362145405
  received cities  London,Manchester,Birmingham
  SUCCESS: SUBSCRIBER:main_subscriber RESULT:Received Message on Default CHANNEL:message TIMESTAMP:1394362145405

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Credits
The initial scaffold for this module was generated thanks to the Node-Mocha-Star generator (https://github.com/braddenver/generator-node-mocha-star)

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 Marcel du Preez. Licensed under the MIT license.
