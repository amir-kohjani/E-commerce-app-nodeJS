const { Schema } = require('mongoose');
const colorSelectedSchema = require('./colorSelectedSchema');
const itemCartSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,

        minLength: 10,
        maxLength: 100,

    },
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
    image: {
        type:"string",
        required: true
    },
    colorSelected: {
        type: colorSelectedSchema,
        required: true
    },
    sizeSelected: {
        type: "string",
        required: true
    },
    count: {
        type: 'number',
        required: true
    },
    stock: {
        type: 'boolean',
        required: true,
        default: true
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
})

module.exports = itemCartSchema;