const userRepo = require('../DAL/user.repo');
const wishListRepo = require('../DAL/wishList.repo');

const controller = {
    getWishListByUserId: async (req, res) => {
        const userId = req?.query?.userId || null;

        if (userId == null) {
            res.status(400).send({ message: 'شناسه کاربر باید وارد شود!', isError: true })
        }
        else {
            const user = await userRepo.findUserById(userId);
            if (!user) {
                res.status(404).send({ message: "کاربر یافت نشد!", isError: true });
            }
            else {
                const wishList = await wishListRepo.findWishListByUserId(user.id);
                if (!wishList) {
                    const newWishList = await wishListRepo.create(user.id);
                    res.status(200).send({ ...newWishList, isError: false });
                }
                else {
                    res.status(200).send({ ...wishList, isError: false });

                }
            }
        }
    },
    addItemToWishListByUserId: async (req, res) => {
        const userId = req?.body?.userId || null;
        const item = req?.body?.item || null;
        if (userId == null || item == null) {
            res.status(400).send({ message: 'شناسه کاربر باید وارد شود و آیتم باید وارد شود!', isError: true })
        }
        else {
            const user = await userRepo.findUserById(userId);
            if (!user) {
                res.status(404).send({ message: "کاربر یافت نشد!", isError: true });
            }
            else {
                const wishList = await wishListRepo.findWishListByUserId(user.id);
                if(!wishList){
                    res.status(400).send({ message: 'لیست با این مشخصات یافت نشده!', isError: true })
                }
                else{
                    const wishListUpdated = await wishListRepo.addItemToWishListByUserId(user.id ,item);
                    res.status(200).send({...wishListUpdated, isError: false});
                }
            }

        }
    },
    removeItemfromWishListByUserId:async (req, res) => {
        const userId = req?.body?.userId || null;
        const item = req?.body?.item || null;
 
        if (userId == null || item == null) {
            res.status(400).send({ message: 'شناسه کاربر باید وارد شود و آیتم باید وارد شود!', isError: true })
        }
        else {
            const user = await userRepo.findUserById(userId);
            if (!user) {
                res.status(404).send({ message: "کاربر یافت نشد!", isError: true });
            }
            else {
                const wishList = await wishListRepo.findWishListByUserId(user.id);
                if(!wishList){
                    res.status(400).send({ message: 'لیست با این مشخصات یافت نشده!', isError: true })
                }
                else{
                    const wishListUpdated = await wishListRepo.removeItemfromWishListByUserId(user.id ,item);
                    res.status(200).send({...wishListUpdated, isError: false});
                }
            }

        }
     }

}

module.exports = controller;