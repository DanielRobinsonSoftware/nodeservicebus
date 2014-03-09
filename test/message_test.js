'use strict';

/*jshint expr: true*/
/*exported should*/
var should = require('should'),
    message = require('../lib/message');

describe('message', function(){

  it('should set messageType to transient when direct message created', function(){
    var msg = message.createDirect('myMessage', 'payload');
    msg.messageType.should.equal('transient');
  });

  it('should set messageIdentifier to myMessage when direct message created', function(){
    var msg = message.createDirect('myMessage', 'payload');
    msg.messageIdentifier.should.equal('myMessage');
  });

  it('should set payload to "payload" when direct message created', function(){
    var msg = message.createDirect('myMessage', 'payload');
    msg.payload.should.equal('payload');
  });

  it('should set messageType to queued when queued message created', function(){
    var msg = message.createQueued('myMessage', 'payload');
    msg.messageType.should.equal('queued');
  });

  it('should set messageIdentifier to myMessage when queued message created', function(){
    var msg = message.createQueued('myMessage', 'payload');
    msg.messageIdentifier.should.equal('myMessage');
  });

  it('should set payload to "payload" when queued message created', function(){
    var msg = message.createQueued('myMessage', 'payload');
    msg.payload.should.equal('payload');
  });

});


