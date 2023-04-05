const express = require('express');
const router = express.Router();

const Product = require('../controllers/product');

router.get('/get-products', (req, res, next) => {
  const products = new Product().getAllProducts();
  res.status(201).json(products);
});

module.exports = router;
