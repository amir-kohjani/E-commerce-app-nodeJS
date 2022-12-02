const jwt = require('jsonwebtoken')

const UserModel = require('../models/userModel/userModel');

const repo = {
    create:
        async (numberPhone) => {
            const user = new UserModel({ phone: numberPhone });
            await user.save();
            return user;
        },
    findUserByPhon:
        async (phonenumber) => {
            const user = await UserModel.findOne({ phone: phonenumber });
            return user;
        },
    findUserById:
        async (id) => {
            const user = await UserModel.findOne({ id: id });
            return user;
        },
    genToken:
        async ({ id }) => {
            const user = await UserModel.findOne({ id });

            if (!user) {
                return new Error('کاربر پیدا نشد!');
            } else {
                const token = jwt.sign({ _id: user._id, phone: user.phone }, process.env.JWT_Secret);
                user.tokens = user.tokens || [];
                user.tokens.push(token);
                user.token = token;
                 await UserModel.findOneAndUpdate({ id: id }, user);
                return token;
            }

        },
    updateById:
        async (id, user) => {
            const userUpdated = await UserModel.findByIdAndUpdate({ id }, user);
            return userUpdated;
        }
}

module.exports = repo;