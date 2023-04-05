const assert = require('assert');
const request = require('supertest');
const app = require('./app'); // assuming app.js contains the implementation of the /get-products route

describe('GET /get-products', function() {
  it('responds with JSON', function(done) {
    request(app)
      .get('/get-products')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('returns an array of products', function(done) {
    request(app)
      .get('/get-products')
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) return done(err);
        assert(Array.isArray(res.body), 'response is not an array');
        done();
      });
  });

  it('sorts products by title in ascending order', function(done) {
    request(app)
      .get('/get-products?sortBy=title&sortOrder=asc')
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(res.body[0].title, 'Product 1', 'first product is not Product 1');
        assert.equal(res.body[1].title, 'Product 2', 'second product is not Product 2');
        assert.equal(res.body[2].title, 'Product 3', 'third product is not Product 3');
        done();
      });
  });

  it('sorts products by price in descending order', function(done) {
    request(app)
      .get('/get-products?sortBy=price&sortOrder=desc')
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) return done(err);
        assert.equal(res.body[0].title, 'Product 3', 'first product is not Product 3');
        assert.equal(res.body[1].title, 'Product 2', 'second product is not Product 2');
        assert.equal(res.body[2].title, 'Product 1', 'third product is not Product 1');
        done();
      });
  });
});
