/************************
       Unit Tests
************************/

var expect = require("chai").expect;

before(function(){
  //TODO seed the database
});

describe('suite one ',function(){
  beforeEach(function(){
    //todo log in test user
  });
  it('test one', function(done){
     expect(4+5).to.equal(9);
     done();
  });
});

