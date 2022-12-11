
const CartModel = require('../models/cartModel/cartModel');

const repo = {
    create: async (userId) => {
        const newCart = new CartModel({ userId });
        await newCart.save();
        return newCart;
    },
    findCartByUserId: async (userId) => {
        const cart = await CartModel.findOne({ userId: userId });
        return cart;
    },
    addItemToCartByUserId: async (userId, item) => {
        const cart = await CartModel.findOne({ userId: userId });
        cart.itemList.push(item);
        const cartUpdated = await CartModel.findOneAndUpdate({ userId: userId }, cart);
        return cartUpdated;
    },
    removeItemByUserId: async (userId, item) => {
        try {
            const cart = await CartModel.findOne({ userId: userId });
            const itemList = await cart.removeItem(item);
            const cartUpdated = await CartModel.findOneAndUpdate({ userId: userId }, cart);
            return cartUpdated;
        }
        catch (error) {
            console.log(error);

        }
    }
}

module.exports = repo;