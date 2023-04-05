class Cart {
  constructor(cartId, userId) {
    this.cartId = cartId;
    this.userId = userId;
    this.products = [];
  }

  addProduct(product) {
    this.products.push(product);
  }

  removeProduct(productId) {
    this.products = this.products.filter(
      (product) => product.productId !== productId
    );
  }

  toJSON() {
    return {
      cartId: this.cartId,
      userId: this.userId,
      products: this.products,
    };
  }
}
