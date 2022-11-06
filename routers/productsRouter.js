const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/',(req, res) => {});
router.get('/byCategory',productController.getProductsByCategory);
router.get('/byId',productController.getProductById);
router.get('/ByTitle',productController.getProductsByTitle);

router.post('/',productController.create);





module.exports =router;