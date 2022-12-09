const ProductModel = require('../models/productModel/productModel');

const repo = {
    create: async (product) => {
        const newProduct = new ProductModel(product);
        await newProduct.save();
    },
    getProductsByCategoriy: async (query) => {
        const perPage = 8;
        const page = query?.page || 1;
        const sort = handleQuerySort(query?.sort);
        const options = {
            page: page,
            limit: perPage,
            sort: sort ? sort : {}
        }
        const products = await ProductModel.paginate({
            ...query.category ? { 'category': query.category } : {},
            ...query.color ? { 'colors.name': new RegExp(`${query.color}`, "i") } : {},
            ...query.size ? { 'colors.size': query.size } : {},
            ...query.stock ? { 'stock': query.stock } : {}
        }, options)
        return ( products);
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

const handleQuerySort = (query) => {
    try {
        // convert the string to look like json object
        // example "id: -1, name: 1" to "{ "id": -1, "name": 1 }"
        const toJSONString = ("{" + query + "}").replace(/(\w+:)|(\w+ :)/g, (matched => {
            return '"' + matched.substring(0, matched.length - 1) + '":';
        }));

        return JSON.parse(toJSONString);
    } catch (err) {
        return JSON.parse("{}"); // parse empty json if the clients input wrong query format
    }
}

module.exports = repo;