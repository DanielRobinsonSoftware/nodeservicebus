# NodeServiceBus

This project is currently in development and in very early stages. You are welcome to have a play around and offer suggestions.

## Documentation

## About

NodeServiceBus aims to provide you with a service host that you can clone in process (with something like [cluster](http://nodejs.org/api/cluster.html) ) or on many different machines.
You can use it inside express apps or as standalone processes.

It uses Redis PubSub with a reliable persistence mechanism, which means that messages will be queued until service hosts come back online.
The main concept around NodeServiceBus is to allow you to follow the [CQRS](http://en.wikipedia.org/wiki/Command%E2%80%93query_separation) pattern. NodeServiceBus uses a simple 'Message' and 'MessageHandler' pattern, which allows you to fully control how you structure your logic.

The point of NodeServiceBus is to send messages around the system and have one or many handlers respond (PubSub).
Handlers can also send messages which allows everything to be event driven and non-blocking. There is no single 'source of truth' and every component knows only what it has to do (Single Responsibility).

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

## Roadmap

+ Dependency Injection in Handlers
+ Built in Handlers (eg. Logging, FileWatching, HttpGet and HttpPost, etc...)
+ Admin UI for monitoring all messages and performance
+ Able to record all messages (EventSourcing)
+ WebSocketService (full duplex communication between a front-end such as [Angular](http://angularjs.org/))

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Credits
The initial scaffold for this module was generated thanks to the Node-Mocha-Star generator (https://github.com/braddenver/generator-node-mocha-star)

## Release History
http://www.npmjs.org/package/nodeservicebus

## License
Copyright (c) 2014 Marcel du Preez. Licensed under the MIT license.
