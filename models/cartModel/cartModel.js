const { Schema,model} = require('mongoose');
const shortUniqId = require('short-unique-id');
const itemCartSchema = require('./itemCartSchema');


const uid = new  shortUniqId({
    dictionary:'number',
    length:6
});
const CartSchema = new Schema({
    id:{
        type: String,
        required: true,
        unique: true,
        minLength:6,
        maxLength:6,
        default:()=>uid()
    },
    userId:{
        type: String,
        required: true,
    },
    itemList:{
        type:[itemCartSchema],
        default:[]
    },
    totalPrice:{
        type: Number,
        default:0
    }
})

const CartModel = model('Carts',CartSchema);

module.exports = CartModel;