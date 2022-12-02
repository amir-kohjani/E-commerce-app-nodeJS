const cartRepo = require('../DAL/cart.repo');
const userRepo = require('../DAL/user.repo');

const controller = {
    getCartByUserId: async (req, res) => {
        const userId = req?.query?.userId || null;
        if (userId == null) {
            res.status(400).send({ message: 'شناسه کاربر باید وارد شود!', isError: true })
        } else {
            const user = await userRepo.findUserById(userId);
            if (!user) {
                res.status(404).send({ message: "کاربر یافت نشد!", isError: true })
            } else {
                const cart = await cartRepo.findCartByUserId(user.id);
                if (cart) {
                    res.status(200).send({ ...cart, isError: false });
                } else {
                    const newCart = await cartRepo.create(user.id);
                    res.status(200).send({ ...newCart, isError: false });
                }
            }
        }
    },
    addItemToCartByUserId: async (req, res) => {
        const userId = req?.body?.userId || null;
        const item = req?.body?.item || null;
        if (userId == null) {
            res.status(400).send({ message: 'شناسه کاربر باید وارد شود!', isError: true })
        } else {
            const cart = await cartRepo.findCartByUserId(userId);
            if (!cart) {
                res.status(400).send({ message: 'سبد خرید با این مشخصات یافت نشده!', isError: true })
            } else {
                const cartUpdated = await cartRepo.addItemToCartByUserId(userId, item);
                res.status(200).send({ ...cartUpdated, isError: false });

            }
        }
    }
}

module.exports = controller;