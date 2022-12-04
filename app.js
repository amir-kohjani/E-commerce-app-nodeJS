const express = require('express');
const mongoose = require('mongoose');
const connection = require('./DAL/Connection');
const cors = require('cors');
const app = express();
require('dotenv').config();

const productRouter = require('./routers/productsRouter')
const authRouter = require('./routers/authRouter')
const userRouter = require('./routers/userRouter')
const cartRouter = require('./routers/cartRouter');
const wishListRouter = require('./routers/wishListRouter');


//----------------Middlewares----------------------
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//--------------------Connection to DataBase-----------------------------
connection();

//--------------------------Routers----------------------------------------
app.use('/product',productRouter)
app.use('/auth',authRouter);
app.use('/user',userRouter);
app.use('/cart',cartRouter);
app.use('/wishList',wishListRouter);
//------------------Running Server------------------ -------
app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on port ${process.env.PORT || 3000}`);
})

