const { Schema } = require('mongoose');

const itemWishListSchema = new Schema({
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
    desc: {
        type: "string",
        required: true,
    },
    image: {
        type:"string",
        required: true
    },
})

module.exports = itemWishListSchema;