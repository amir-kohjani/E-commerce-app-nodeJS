const mongoose = require('mongoose');
const colorSchema = new mongoose.Schema({

    name: 'string',
    count:{type:Number,required:true},
    stock: {type:Boolean,default:true},
    sizes: {
        type:[ "string"],
        required: true,
        // enum: ["XS", "S", "M", "L", "XL","XXXL","XXXL"]
    },
    images:[{
        type:String,
        required: true,
    }]

})

module.exports = colorSchema;