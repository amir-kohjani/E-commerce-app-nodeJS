const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/',(req, res) => {
    console.log('test connection')
    res.status(200).send(
       {test:"successful"}
    )
});
router.get('/test',(req, res) => {
console.log(req.query)
res.status(200).send("")
});
router.get('/byCategory',productController.getProductsByCategory);
router.get('/bySuggest',productController.getProductsBySuggest);
router.get('/byId',productController.getProductById);
router.get('/ByTitle',productController.getProductsByTitle);

router.post('/',productController.create);





module.exports =router;