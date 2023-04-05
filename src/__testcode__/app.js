const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

const CART_FILE_PATH = './__mockdata__/cart.json';
const products = [
  new Product(1, 'Product A', 10),
  new Product(2, 'Product B', 20),
  new Product(3, 'Product C', 30),
  new Product(4, 'Product D', 40),
];

// Middleware to parse request body as JSON
app.use(bodyParser.json());

// Endpoint to get products based on sort mechanism
app.get('/get-products', (req, res) => {
  const sortField = req.query.sort || 'title';
  const sortOrder = req.query.order || 'asc';

  let sortedProducts = products.slice();

  if (sortField === 'title') {
    sortedProducts.sort((a, b) => {
      if (a.title < b.title) {
        return sortOrder === 'asc' ? -1 : 1;
      } else if (a.title > b.title) {
        return sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  } else if (sortField === 'price') {
    sortedProducts.sort((a, b) => {
      if (a.price < b.price) {
        return sortOrder === 'asc' ? -1 : 1;
      } else if (a.price > b.price) {
        return sortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  res.json(sortedProducts);
});
app.get('/get-products', (req, res) => {
  // Read products from JSON file
  const products = JSON.parse(fs.readFileSync('products.json'));

  // Sort products based on sort query parameters
  if (req.query.sort === 'title') {
    products.sort((a, b) => (a.title > b.title ? 1 : -1));
  } else if (req.query.sort === 'price') {
    products.sort((a, b) =>
      req.query.order === 'ASC' ? a.price - b.price : b.price - a.price
    );
  }

  // Return sorted products
  res.json(products);
});

// Endpoint to add a product to cart
app.post('/cart/add', (req, res) => {
  const productId = req.body.productId;
  const productToAdd = products.find(product => product.id === productId);

  if (!productToAdd) {
    res.status(400).json({ error: 'Product not found' });
    return;
  }

  const cart = readCartFromFile();

  cart.addProduct(productToAdd);

  writeCartToFile(cart);

  res.json({ message: 'Product added to cart' });
});

// Endpoint to remove a product from cart
app.delete('/cart/remove', (req, res) => {
  // Read carts from JSON file
  const carts = JSON.parse(fs.readFileSync('./__mockdata__/carts.json'));

  // Find user's cart and product in cart
  const userCart = carts.find((cart) => cart.userId === req.body.userId);
  const productInCart = userCart.products.find(
    (product) => product.productId === req.body.productId
  );

  // Remove product from cart
  userCart.products.splice(userCart.products.indexOf(productInCart), 1);

  // Save carts to JSON file
  fs.writeFileSync('./__mockdata__/carts.json', JSON.stringify(carts, null, 2));

  // Return updated cart
  res.json(userCart);
});

// Endpoint to get all items in cart
app.get('/cart', (req, res) => {
  // Read carts from JSON file
  const carts = JSON.parse(fs.readFileSync('./__mockdata__/carts.json'));

  // Find user's cart
  const userCart = carts.find((cart) => cart.userId === req.query.userId);

  // Return user's cart
  res.json(userCart);
});

// Start server on port 3000
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
