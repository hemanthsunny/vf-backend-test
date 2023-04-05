const fs = require("fs");
const Product = require("./product");

class CartRepository {
  constructor() {
    this.dataFile = "../__mockdata__/carts.json";
  }

  async getCart(cartId) {
    const data = await this._readDataFromFile();
    const cartData = data.find((cart) => cart.cartId === cartId);
    if (!cartData) {
      return null;
    }

    const cart = new Cart(cartData.cartId, cartData.userId);
    cartData.products.forEach((productData) => {
      const product = new Product(
        productData.productId,
        productData.name,
        productData.description,
        productData.price,
        productData.quantity
      );
      cart.addProduct(product);
    });

    return cart;
  }

  async saveCart(cart) {
    const data = await this._readDataFromFile();
    const existingCartIndex = data.findIndex(
      (cartData) => cartData.cartId === cart.cartId
    );
    if (existingCartIndex !== -1) {
      data[existingCartIndex] = cart.toJSON();
    } else {
      data.push(cart.toJSON());
    }
    await this._writeDataToFile(data);
  }

  async _readDataFromFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.dataFile, "utf8", (err, data) => {
        if (err) {
          if (err.code === "ENOENT") {
            // File doesn't exist, return empty array
            resolve([]);
          } else {
            reject(err);
          }
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  }

  async _writeDataToFile(data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.dataFile, JSON.stringify(data), "utf8", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = CartRepository;
