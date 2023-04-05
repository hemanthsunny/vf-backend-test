const https = require("https");

class ProductRepository {
  constructor() {
    this.products = null;
  }

  async getAllProducts() {
    if (!this.products) {
      const data = await this._fetchData('https://efuktshirts.com/products.json');
      this.products = data.products;
    }

    return this.products;
  }

  async getProductPriceById(id, sort = 'none') {
    const products = await this.getAllProducts();
    const product = products.find((p) => p.id === id);

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    const variants = product.variants;

    if (sort === 'asc') {
      variants.sort((a, b) => a.price - b.price);
    } else if (sort === 'desc') {
      variants.sort((a, b) => b.price - a.price);
    }

    const variant = variants[0];

    return variant.price;
  }

  _fetchData(url) {
    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const parsedData = JSON.parse(data);
            resolve(parsedData);
          } catch (error) {
            reject(error);
          }
        });
      }).on('error', (error) => {
        reject(error);
      });
    });
  }
}

module.exports = ProductRepository;
