const mongoose = require('mongoose');
const AddressSchema = require('./AddressSchema');
const shortUniqId = require("short-unique-id")
const uid = new shortUniqId({
    dictionary: 'number',
    length: 6
});
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        minLength: 6,
        maxLength: 6,
        default: () => uid()
    },
    name: {
        type: 'string',
        minLength: 3,
        maxLength: 100,
        default: 'کاربر عزیز'
    },
    lastName: {
        type: 'string',
        minLength: 3,
        maxLength: 100,
    },
    phone: {

        type: 'string',
        required: true,
        minLength: 11,
        maxLength: 11,
        match: /09(1[0-9]|3[0-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/
    },
    email: {
        type: 'string',
        minLength: 3,
        maxLength: 320,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,

    },
    passwords: {
        type: 'string',
        length: 60,

    },
    addressList: {
        type: [AddressSchema],
        default: []

    },
    token: {
        type: "string"
    },
    tokens: {
        type: [String]
    }

})

const UserModel = mongoose.model('Users', userSchema);
module.exports = UserModel;