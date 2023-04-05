const assert = require('assert');
const request = require('supertest');
const app = require('../');

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
        "products": [
          {
            "productId": "product-1",
            "name": "Product 1",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "price": 10.99,
            "quantity": 2
          },
          {
            "productId": "product-2",
            "name": "Product 2",
            "description": "Suspendisse ut sapien magna. Sed eu orci auctor, lobortis velit ut, laoreet magna.",
            "price": 19.99,
            "quantity": 1
          }
        ]
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
