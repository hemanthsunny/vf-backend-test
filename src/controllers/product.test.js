const assert = require('assert');
const ProductRepository = require('./ProductRepository');

describe('ProductRepository', function () {
  const productRepository = new ProductRepository();

  before(async function () {
    // Make sure to wait for data to be fetched before running tests
    await productRepository.getAllProducts();
  });

  describe('#getAllProducts()', function () {
    it('should return an array of products', async function () {
      const products = await productRepository.getAllProducts();
      assert(Array.isArray(products));
    });
  });

  describe('#getProductPriceById()', function () {
    it('should throw an error if product not found', async function () {
      try {
        await productRepository.getProductPriceById('invalid-id');
        assert.fail('Expected an error to be thrown');
      } catch (error) {
        assert.strictEqual(error.message, 'Product with id invalid-id not found');
      }
    });

    it('should return the price of the first variant when not sorted', async function () {
      const price = await productRepository.getProductPriceById('1');
      assert.strictEqual(price, 15);
    });

    it('should return the price of the cheapest variant when sorted by ascending price', async function () {
      const price = await productRepository.getProductPriceById('1', 'asc');
      assert.strictEqual(price, 10);
    });

    it('should return the price of the most expensive variant when sorted by descending price', async function () {
      const price = await productRepository.getProductPriceById('1', 'desc');
      assert.strictEqual(price, 20);
    });
  });
});
