const WishListModel = require('../models/wishListModel/WishListModel')

const repo = {
    create: async (userId) => {
        const newWishList = new WishListModel({ userId });
        await newWishList.save();
        return newWishList;
    },
    findWishListByUserId: async (userId) => {
        const wishList = await WishListModel.findOne({ userId });
        return wishList;
    },
    addItemToWishListByUserId: async (userId, item) => {
        try {
            const wishList = await WishListModel.findOne({ userId });
            await wishList.addItem(item);
            await wishList.save();
            return wishList;
        } catch (err) {
            console.log(err);
            return null;
        }

    },
    removeItemfromWishListByUserId: async (userId, item) => {
        try {
            const wishList = await WishListModel.findOne({ userId });
            const itemList = await wishList.removeItem(item);
            await wishList.save();
            return wishList;
        } catch (err) {
            console.log(err);
            return null;
        }

    }
}

module.exports = repo;