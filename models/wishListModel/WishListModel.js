const mongoose = require('mongoose');
const { Schema } = mongoose;
const shortUniqId = require('short-unique-id');
const itemWishListSchema = require('./itemWishListSchema');

const uid = new shortUniqId({
    dictionary: 'number',
    length: 6
});
const WishlistSchema = new Schema({
    id: {
        type: String,
        required: true,
      
        default: () => uid()
    },
    userId: {
        type: String,
    
        required: true,
    },
    itemList: {
        type: [itemWishListSchema],
        default: []
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
})

WishlistSchema.methods.removeItem = function (removedItem) {
    this.itemList = this.itemList.filter(function (item) {
        return item.id != removedItem.id;
    })
    return this.itemList;;
}
WishlistSchema.methods.addItem = function (item) {
    this.itemList.push(item);
    return this.itemList;
}


const WishlistModel = mongoose.model('wishList', WishlistSchema);

module.exports = WishlistModel;