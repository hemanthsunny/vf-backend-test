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
  });

});
