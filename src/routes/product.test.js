const assert = require('assert');
const request = require('supertest');
const app = require('../');
const Product = require('../controllers/product');

describe('Product Routes', () => {

  describe('POST /get-products', () => {
    it('should return all products', async () => {
      const expectedProducts = new Product().getAllProducts();
      const response = await request(app)
        .post('/get-products')
        .expect(201);
      assert.deepEqual(response.body, expectedProducts);
    });

    it('sorts products by title in ascending order', function(done) {
      request(app)
        .get('/get-products?sort=title&order=asc')
        .set('Accept', 'application/json')
        .end(function(err, res) {
          if (err) return done(err);
          assert.equal(res.body[0].title, 'Classic Sticker Pack');
          done();
        });
    });

    it('sorts products by price in descending order', function(done) {
      request(app)
        .get('/get-products?sort=price&order=desc')
        .set('Accept', 'application/json')
        .end(function(err, res) {
          if (err) return done(err);
          assert.equal(res.body[0].title, "Play On Player Women's Tee");
          assert.equal(res.body[0].variant_title, "White \/ 2XL");
          done();
        });
    });
  });

});
