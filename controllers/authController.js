// const redisClient = require('../Redis')
const redis = require('redis')
const userRepo = require('../DAL/user.repo')
const REDIS_PORT = process.env.PORT || 6379;
const redisClient = redis.createClient(REDIS_PORT);


const genRandomCode = () => {

    const code = Math.floor(Math.random() * 9999);

    if (code < 1000) genRandomCode();
    else return code;

}

const genRandomCodeHandler = () => {
    return new Promise((resolve, reject) => {


        const code = Math.floor(Math.random() * 9999);

        if (code < 1000) return genRandomCodeHandler();
        else resolve(code)

    })
}


const controller = {
    genCode: async (req, res) => {
        const phone = req?.query?.phone || null;

        if (phone == null) {
            res.status(200).send({ message: 'شماره تلفن به درستی وارد نشده است!', isError: true });

        } else {
            try {
                if (redisClient.isOpen) {
                    await redisClient.disconnect();
                }

                redisClient.on('error', (err) => console.log('Redis Client Error', err));

                await redisClient.connect();
                const CODE = await genRandomCodeHandler();
                // await redisClient.set(`${phone}`, `${CODE}`);
                await redisClient.setEx(JSON.stringify(phone), 120, JSON.stringify(CODE));
                console.log('Code: ', CODE);
                await redisClient.disconnect();
                res.status(200).send('کد احراز به شماره ارسال گردید!');
            }
            catch (err) {
                console.log(err)
            }
        }
    },
    validationCode: async (req, res) => {
        const phone = req?.query?.phone || null;
        const code = req?.query?.code || null;

        if (phone == null || code == null) {
            res.status(400).send({ message: 'شماره تلفن یا کد به  وارد نشده است!' });
        } else {
            try {
                redisClient.on('error', (err) => console.log('Redis Client Error', err));
                await redisClient.connect();
                const curentCode = await redisClient.get(JSON.stringify(phone));
                await redisClient.disconnect();
                if (curentCode != code) {
                    console.log("error code")
                    res.status(200).send({ message: 'کد وارد شده صحیح نمی باشد!', isError: true });
                }
                else if (curentCode == code) {
                    const user = await userRepo.findUserByPhon(phone);
                    //new user
                    if (user) {
                        const token = await userRepo.genToken(user);
                        delete user.tokens;
                        
                        res.status(200).send({ ...user, isError: false });
                        //user exists
                    } else if (user == null) {

                        userRepo.create(phone)
                            .then(async (newUser) => {
                                const token = await userRepo.genToken(newUser);
                                delete newUser.tokens;
                                newUser.token = token;
                                res.status(200).send({ ...newUser, isError: false });
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    }
                }

            }
            catch (err) {
                res.status(500).send();


            }
        }

    }
}

module.exports = controller;