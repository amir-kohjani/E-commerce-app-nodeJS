const uniqueValidator = require('mongoose-unique-validator');
const shortUniqId = require('short-unique-id')
const mongoose = require('mongoose');
const ColorSchema = require('./ColorSchema');

const uid = new  shortUniqId({
    dictionary:'number',
    length:6
});

const productSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        minLength:6,
        maxLength:6,
        default:()=>uid()
    },
    title: {
        type: String,
        required: true,

        minLength: 10,
        maxLength: 100,

    },
    category: [{
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    }],
    price: {
        type: 'number',
        required: true,
    },
    discount: {
        type: 'number',
        required: false,
        minLength: 10,
        maxLength: 100
    },
    priceWithDiscount: {
        type: "number",
        required: function () {
            return this.discount;
        },
        default: function () {
            return this.discount ? this.price - ((this.price * this.discount) / 100) : null;
        },

    },
    desc: {
        type: "string",
        required: true,
    },
    brand: {
        type: "string",
        required: true,
    },
    colors: { type: [ColorSchema], required: true },
   

    stock: {
        type: "boolean",
        default: true,
    },
    created_at: { type: Date },
    updated_at: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }

})

productSchema.plugin(uniqueValidator);
// productSchema.methods.getProductsByCategory = function getProductsByCategory(category){
    
// }
// productSchema.methods.setDiscount = function setDiscount() {
//     this.priceWithDiscount = this.discount ? this.price - ((this.price * this.discount) / 100) : null
// }
const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;