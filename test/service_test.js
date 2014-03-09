'use strict';

/*jshint expr: true*/
/*exported should*/
var should = require('should'),
    service = require('../lib/service');

describe('service', function(){
  it('should call start method and have a non empty bus var', function(done){
    service.createService('service 1', [], function(bus){
      bus.should.be.ok;
      done();
    });
  });
});


