const mongoose = require('mongoose');
const ColorModel = require('./colorModel');
const productSchema = new mongoose.Schema({
    id: { type: 'string', required: true },
    category: [{type:String,required:true}],
    // title: { type: 'string', required: true },
    // price: {
    //     type: 'number',
    //     required: true,
    // },
    // discount: {
    //     type: 'number',
    //     required: false
    // },
    // priceWithDiscount: {
    //     type: "number",
    //     required: function () {
    //         return this.discount;
    //     },
    //     default: function () {
    //         return this.discount ? this.price - ((this.price * this.discount) / 100) : null;
    //     },

    // },
    // img: {
    //     type: "string",
    //     required: true,
    // },
    // desc: {
    //     type: "string",
    //     required: true,
    // },
    // brand: {
    //     type: "string",
    //     required: true,
    // },
    // colors: { type: [ColorModel], required: true },
    // sizes: {
    //     type: "string",
    //     required: true,
    //     enum: ["XS", "S", "M", "L", "XL"]
    // },

    // stock: {
    //     type: "boolean",
    //     default: true,
    // },
    // created_at: { type: Date },
    // updated_at: { type: Date, default: Date.now },
    // updated: { type: Date, default: Date.now }

})
// productSchema.methods.setDiscount = function setDiscount() {
//     this.priceWithDiscount = this.discount ? this.price - ((this.price * this.discount) / 100) : null
// }
const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;