'use strict';

/*jshint expr: true*/
var should = require('should'),
    service = require('../lib/service');

// by testing for the existance of should we prevent jshint throwing: 'should' is defined but never used.
describe('Should Assertion Test', function () {
  it('should have a should variable', function () {
    should.exist(should);
  });
});

describe('service', function(){
  it('should call start method and have a non empty bus var', function(done){
    service.createService('service 1', [], function(bus){
      bus.should.be.ok;
      done();
    });
  });
});


