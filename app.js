const express = require('express');
const mongoose = require('mongoose');
const connection = require('./DAL/Connection');
const app = express();
require('dotenv').config();

//--------------------Connection to DataBase-----------------------------
connection();
//------------------Running Server------------------ -------
app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on port ${process.env.PORT || 3000}`);
})

