const express = require('express');
const router = express.Router();
const wishListController = require('../controllers/wishListController');
router.get('/getWishListByUserId',wishListController.getWishListByUserId);
router.post('/addItemToWishListByUserId',wishListController.addItemToWishListByUserId);
router.post('/removeItemFromWishListByUserId',wishListController.removeItemfromWishListByUserId);

module.exports =router;