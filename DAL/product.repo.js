const ProductModel = require('../models/productModel/productModel');

const repo = {
    create: async (product) => {
        const newProduct = new ProductModel(product);
        await newProduct.save();
    },
    getProductsByCategoriy: async (category,filters) => {
        const products = await ProductModel.find({ category: { $all: category } });
        return products;
    },
    getProductById: async (id) => {
        const product = await ProductModel.findOne({ id: id });
        return product;
    },
    getProductsByTitle: async (title, filter = {}) => {
        let keys = Object.keys(filter);
        let values = Object.values(filter)

        let regex = new RegExp(`${title}`, "i");
        const products = await ProductModel.find({ title: regex, [keys[0]]: values[0] })



        return products;
    },
    getProductsBySuggest: async (category) => {
        const products = await ProductModel.find({ category: { $in: category } });
        return products;
    }

};

module.exports = repo;