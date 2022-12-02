const userRepo = require('../DAL/user.repo');

const controller = {
    getUserById:async (req, res) => {
        const id = req?.query?.id || null;
        console.log(id)
        if (id == null) res.status(400).send({ message: 'شناسه کاربر باید وارد شود!', isError: true });
        else {
           const user = await  userRepo.findUserById(id);
           if(!user){
            res.status(404).send({ message:"کاربر یافت نشد!",isError: true });
           }else{
            const token = await userRepo.genToken(user);
           user.tokens= []
            user.token =token;
            res.status(200).send({ ...user, isError: false });
           }
        }
    },
    registration: (req, res) => {

    }
}
module.exports = controller;