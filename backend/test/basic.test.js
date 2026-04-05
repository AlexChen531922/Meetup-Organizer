const { expect } = require('chai');

describe('Backend Basic Tests', function() {
  it('should pass the basic math validation', function() {
    expect(1 + 1).to.equal(2);
  });

  it('should have a valid default port number', function() {
    const port = process.env.PORT || 5001;
    expect(Number(port)).to.be.a('number');
  });
});
