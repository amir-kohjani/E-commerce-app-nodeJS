const { Schema } = require('mongoose');
const colorSelectedSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },

})

module.exports = colorSelectedSchema;