const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

//router.get('/products/delete');

router.get('/products/:productId',shopController.getProduct);//: tells express that it can be anything(dynamic segment),so the get method call order is important here,thus delete route should come before dynamic route.later we extract the information using the name productId



router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
