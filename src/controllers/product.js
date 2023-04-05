const https = require("https");

class ProductRepository {
  constructor() {
    this.products = null;
  }

  async getAllProducts(sort, order) {
    if (!this.products) {
      const data = await this._fetchData('https://efuktshirts.com/products.json');
      this.products = data.products;
    }

    if (sort === 'title') {
      this.products.sort((a, b) => {
        if (a.title < b.title) {
          return order === 'asc' ? -1 : 1;
        } else if (a.title > b.title) {
          return order === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      });
    } else if (sort === 'price' && order === 'asc') {
      this.products = this.products.map(product => {
        // Sort the variants by price
        const sortedVariants = product.variants.sort((a, b) => +b.price - +a.price);

        // Select the most expensive variant
        const selectedVariant = sortedVariants[0];

        // Return a new object with the selected variant and other product properties
        return {
          id: product.id,
          title: product.title,
          description: product.description,
          image: product.image,
          price: +selectedVariant.price,
          variant_title: selectedVariant.title,
          variant_image: selectedVariant.image
        };
      });
      this.products = this.products.sort((a, b) => b.price - a.price);
    } else if (sort === 'price' && order === 'desc') {
      this.products = this.products.map(product => {
        // Sort the variants by price
        const sortedVariants = product.variants.sort((a, b) => +a.price - +b.price);

        // Select the most expensive variant
        const selectedVariant = sortedVariants[0];

        // Return a new object with the selected variant and other product properties
        return {
          id: product.id,
          title: product.title,
          description: product.body_html,
          price: +selectedVariant.price,
          variant_title: selectedVariant.title,
          variant_id: selectedVariant.id
        };
      });
      this.products = this.products.sort((a, b) => a.price - b.price);
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
