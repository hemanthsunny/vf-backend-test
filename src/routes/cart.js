const express = require('express');
const router = express.Router();

const Cart = require('../controllers/cart');

router.get('/cart', (req, res, next) => {
  const cartDetails = new Cart().getCart();
  res.status(201).json(cartDetails);
});

router.post('/cart/update', (req, res, next) => {
  new Cart().saveCart();
  res.status(201).json({
    message: "Cart updated"
  });
});

module.exports = router;
