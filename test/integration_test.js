'use strict';

/*jshint expr: true*/
/*exported should*/
var should = require('should'),
    service = require('../lib/service'),
    handler = require('../lib/handler'),
    message = require('../lib/message');

describe('service', function(){

  it('should call both handlers for message when sent as direct', function(done){

    var calls = 0;
    var assertCalls = function(){
      calls += 1;
      if(calls === 2){
        done();
      }
    };

    var myMessage = message.createDirect('myMessage', 'my payload');

    var myHandler = handler.createHandler('myMessage', function(msg){
      msg.payload.should.equal(myMessage.payload);
      assertCalls();
    });

    var myHandler2 = handler.createHandler('myMessage', function(msg){
      msg.payload.should.equal(myMessage.payload);
      assertCalls();
    });

    service.createService('service 1', [myHandler, myHandler2], function(bus){
      bus.send(myMessage);
    });

  });

});


