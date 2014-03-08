'use strict';

/*jshint expr: true*/
var should = require('should');

// by testing for the existance of should we prevent jshint throwing: 'should' is defined but never used.
describe('Should Assertion Test', function () {
  it('should have a should variable', function () {
    should.exist(should);
  });
});

describe('AwesomenessTest', function(){
  it('should return awesome from #awesome()', function(done){

    done();
  });
  it('is pending implementation');
});


