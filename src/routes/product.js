const express = require('express');
const router = express.Router();

const Product = require('../controllers/product');

router.get('/get-products', (req, res, next) => {
  const sort = req.query.sort || 'title';
  const orderBy = req.query.order || 'asc';

  const products = new Product().getAllProducts(sort, orderBy);
  res.status(201).json(products);
});

module.exports = router;
