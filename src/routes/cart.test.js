const assert = require('assert');
const request = require('supertest');
const app = require('../');
const products = require('../__mockdata__/products.json');

describe('Cart API', () => {
  describe('POST /cart', () => {
    it('should return 201 status code and cart details', async () => {
      const res = await request(app)
        .post('/cart')
        .send();
      assert.strictEqual(res.status, 201);
      assert.deepStrictEqual(res.body,   {
        "cartId": "cart-1",
        "userId": "user-1",
        "products": products
      });
    });
  });

  describe('POST /cart/update', () => {
    it('should return 201 status code and message', async () => {
      const res = await request(app)
        .post('/cart/update')
        .send();
      assert.strictEqual(res.status, 201);
      assert.deepStrictEqual(res.body, {
        message: "Cart updated"
      });
    });
  });
});
