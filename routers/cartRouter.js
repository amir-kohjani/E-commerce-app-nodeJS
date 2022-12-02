const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
router.get('/getCartByUserId',cartController.getCartByUserId);
router.post('/addItemToCartByUserId',cartController.addItemToCartByUserId);

module.exports =router;