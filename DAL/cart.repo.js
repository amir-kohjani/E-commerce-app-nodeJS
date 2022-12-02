
const CartModel  = require('../models/cartModel/cartModel');

const repo = {
    create:async (userId)=>{
        const newCart =  new  CartModel({userId});
       await newCart.save();
        return newCart;
    },
    findCartByUserId:async (userId)=>{
        const cart = await CartModel.findOne({userId: userId});
        return cart;
    },
    addItemToCartByUserId:async (userId,item)=>{
        const cart = await CartModel.findOne({userId: userId});
        cart.itemList.push(item);
        const cartUpdated = await CartModel.findOneAndUpdate({userId: userId},cart);
        return cartUpdated;
    }
}

module.exports = repo;