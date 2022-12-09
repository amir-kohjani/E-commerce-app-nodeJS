const productRepo = require('../DAL/product.repo');
const controller = {
    create: (req, res, next) => {
        const newProduct = req.body;
        if (!newProduct) {
            res.status(404).send({ message: 'Product is required' });
        }
        //save product
        productRepo.create(newProduct)
            .then(() => {
                res.status(200).send({ message: 'Product saved successfully' })
            })
            .catch((e) => {
                console.error(e);
                res.status(500).send({ message: 'someThing is worng!!' })
            })
    },
    getProductsByCategory: (req, res) => {

        const query = {
            ...req?.query?.category ? { 'category': req?.query?.category } : {},
            ...req?.query?.color ? { 'color':req?.query?.color } : {},
            ...req?.query?.size ? { 'size': req?.query?.size } : {},
            ...req?.query?.page ? { 'page': req?.query?.page } : {},
            ...req?.query?.sort ? { 'sort': req?.query?.sort } : {}
        }

        if (query == null) {
            res.status(404).send({ message: 'Category is required' });
        } else
        //get Products
        {

            productRepo.getProductsByCategoriy(query)
                .then((products) => {
                   
                    res.status(200).send({ products: products});
                })
                .catch((e) => {

                    res.status(500).send({ message: 'someThing is worng!!' })
                })
        }
    },
    getProductsBySuggest: (req, res) => {

        const category = req?.query?.category || null
        // const category = req?.body?.category || null

        if (category == null) {
            res.status(404).send({ message: 'Category is required' });
        } else
        //get Products
        {
            productRepo.getProductsBySuggest(category)
                .then((products) => {
                    res.status(200).send({ products: products });
                })
                .catch((e) => {

                    res.status(500).send({ message: 'someThing is worng!!' })
                })
        }
    },
    getProductById: (req, res) => {
        const productId = req?.query?.Id || null
        if (productId == null) {
            res.status(404).send({ message: 'ID is required' });
        }
        //get product
        else {
            productRepo.getProductById(productId)
                .then((product) => {
                    res.status(200).send({ product: product });

                })
                .catch((e) => {
                    res.status(500).send({ message: 'someThing is worng!!' })

                })
        }
    },
    getProductsByTitle: (req, res) => {
        const title = req?.body?.title || null;
        const filters = req?.body?.filters || {}

        if (!title) {
            res.status(404).send({ message: 'Title is required' });
        }
        else {

            //get product without filter
            productRepo.getProductsByTitle(title, filters)
                .then((products) => {
                    res.status(200).send({ products: products });

                })
                .catch((e) => {
                    res.status(500).send({ message: 'someThing is worng!!' })

                })

        }
    },

}

module.exports = controller;