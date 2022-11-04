const mongoose = require('mongoose');
const colorSchema = new mongoose.Schema({

    name: 'string',
    img:'string',
    count:{type:'number',required:true},
    stock: {type:'boolean',default:true},

})

const ColorModel = mongoose.model('ColorModel',colorSchema);

module.exports = ColorModel;