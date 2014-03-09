'use strict';

/*jshint expr: true*/
/*exported should*/
var should = require('should'),
    handler = require('../lib/handler');

describe('handler', function(){

  it('should set messageIdentifier when handler created', function(){
    var myHandler = handler.createHandler('myMessage', function(){});
    myHandler.messageIdentifier.should.equal('myMessage');
  });

  it('should call handle method when handler is being handled', function(done) {
    var myHandler = handler.createHandler('myMessage', function(){
      done();
    });

    myHandler.handle();
  });

  it('should receive msg and bus parameter to handle method', function(done) {

    var message = {id:'1'},
        bus = {id:'2'};

    var myHandler = handler.createHandler('myMessage', function(msg, bus){
      msg.id.should.equal(message.id);
      bus.id.should.equal(bus.id);
      done();
    });

    myHandler.handle(message, bus);
  });

});


