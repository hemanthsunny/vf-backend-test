const assert = require('assert');
const Product = require('./product');

describe('Product', function () {
  const productRepository = new Product();

  before(async function () {
    // Make sure to wait for data to be fetched before running tests
    await productRepository.getAllProducts();
  });

  describe('#getAllProducts()', function () {
    it('should return an array of products', async function () {
      const products = await productRepository.getAllProducts();
      assert(Array.isArray(products));
    });

    it('should sort products by price in descending order', () => {
      const sortedProducts = await productRepository.getAllProducts("price", "asc");
      assert.deepEqual(sortedProducts, [
        {
          id: 10822924045,
          title: "Play On Player Women's Tee",
          description: "\u003cp\u003ePlay On Player Women's Tee\u003c\/p\u003e",
          price: 20,
          variant_title: "White \/ Small",
          variant_id: 45096030669
        },
        {
          id: 7596624904422,
          title: "Classic Sticker Pack",
          description: "\u003cp\u003eeFukt Classic Sticker Pack. Assorted pack of\u00a05 eFukt stickers.\u003c\/p\u003e\n\u003cp\u003eAvailable while supplies last.\u003c\/p\u003e\n\u003cul\u003e\u003c\/ul\u003e",
          price: 8,
          variant_title: "Default Title",
          variant_id: 42397295673574
        },
      ]);
    });

     it('should select the most expensive variant for each product', () => {
       const sortedProducts = await productRepository.getAllProducts("price", "desc");
       assert.deepEqual(sortedProducts, [
         {
           id: 10822924045,
           title: "Play On Player Women's Tee",
           description: "\u003cp\u003ePlay On Player Women's Tee\u003c\/p\u003e",
           price: 25,
           variant_title: "White \/ 2XL",
           variant_id: 45096030925
         },
         {
           id: 7596624904422,
           title: "Classic Sticker Pack",
           description: "\u003cp\u003eeFukt Classic Sticker Pack. Assorted pack of\u00a05 eFukt stickers.\u003c\/p\u003e\n\u003cp\u003eAvailable while supplies last.\u003c\/p\u003e\n\u003cul\u003e\u003c\/ul\u003e",
           price: 8,
           variant_title: "Default Title",
           variant_id: 42397295673574
         },
       ]);
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
