const mongoose = require('mongoose');
const colorSchema = new mongoose.Schema({

    name: 'string',
    img:'string',
    count:{type:Number,required:true},
    stock: {type:Boolean,default:true},

})

module.exports = colorSchema;