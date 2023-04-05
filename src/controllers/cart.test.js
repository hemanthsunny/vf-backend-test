const assert = require('assert');
const Cart = require('./cart');
const Product = require('./product');

const CartEntity = require('../entities/CartEntity');

describe('CartRepository', () => {
  let cartRepository;

  before(() => {
    // Instantiate a new instance of the CartRepository class before running the tests
    cartRepository = new Cart();
  });

  describe('#getCart()', () => {
    it('should return null when cart does not exist', async () => {
      const cartId = 'nonexistent-cart-id';
      const result = await cartRepository.getCart(cartId);
      assert.strictEqual(result, null);
    });

    it('should return a Cart object when cart exists', async () => {
      const cartId = 'existing-cart-id';
      const result = await cartRepository.getCart(cartId);
      assert.ok(result instanceof Cart);
    });

    it('should return a Cart object with correct properties and products', async () => {
      const cartId = 'existing-cart-id';
      const expectedCartData = {
        cartId: cartId,
        userId: 'user-id',
        products: [
          {
            productId: 'product-1-id',
            name: 'Product 1',
            description: 'Description for Product 1',
            price: 10.99,
            quantity: 2
          },
          {
            productId: 'product-2-id',
            name: 'Product 2',
            description: 'Description for Product 2',
            price: 19.99,
            quantity: 1
          }
        ]
      };
      const result = await cartRepository.getCart(cartId);

      assert.strictEqual(result.cartId, expectedCartData.cartId);
      assert.strictEqual(result.userId, expectedCartData.userId);

      assert.strictEqual(result.products.length, expectedCartData.products.length);
      result.products.forEach((product, index) => {
        const expectedProductData = expectedCartData.products[index];
        assert.strictEqual(product.productId, expectedProductData.productId);
        assert.strictEqual(product.name, expectedProductData.name);
        assert.strictEqual(product.description, expectedProductData.description);
        assert.strictEqual(product.price, expectedProductData.price);
        assert.strictEqual(product.quantity, expectedProductData.quantity);
      });
    });
  });

  describe('#saveCart()', () => {
    it('should save a new cart when cart does not exist', async () => {
      const newCart = new CartEntity('new-cart-id', 'user-id');
      const newProduct = new Product('product-id', 'Product', 'Description', 9.99, 1);
      newCart.addProduct(newProduct);

      await cartRepository.saveCart(newCart);

      const savedCart = await cartRepository.getCart('new-cart-id');
      assert.deepStrictEqual(savedCart.toJSON(), newCart.toJSON());
    });

    it('should update an existing cart when cart exists', async () => {
      const existingCart = await cartRepository.getCart('existing-cart-id');
      existingCart.removeProduct('product-1-id');

      await cartRepository.saveCart(existingCart);

      const updatedCart = await cartRepository.getCart('existing-cart-id');
      assert.deepStrictEqual(updatedCart.toJSON(), existingCart.toJSON());
    });
  });
});
