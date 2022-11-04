const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
        minLength: 3,
        maxLength: 100,
    },
    email: {
        type: 'string',
        required: true,
        minLength: 3,
        maxLength: 320,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    phone:{

  type: 'string',
        required: true,
        minLength: 11,
        maxLength: 11,
        match: /09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/
    },
    passwords: {
        type: 'string',
        required: true,
        length:60,
    },

})

const UserModel = mongoose.model('UserModel',userSchema);
module.exports = UserModel;