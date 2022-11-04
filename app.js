const express = require('express');
const mongoose = require('mongoose');
const connection = require('./DAL/Connection');
const app = express();
require('dotenv').config();
const productRouter = require('./routers/productsRouter')


//----------------Middlewares----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//--------------------Connection to DataBase-----------------------------
connection();


//------------------Running Server------------------ -------
app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on port ${process.env.PORT || 3000}`);
})

