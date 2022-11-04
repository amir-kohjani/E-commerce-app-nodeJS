const mongoose = require('mongoose');

const connection = ()=>{
    mongoose.connect(`mongodb://localhost:27017/${ process.env.DB_NAME}`, { useNewUrlParser: true })
    mongoose.connection.once('open', () => {
        console.log(`mongoose connected to "${ process.env.DB_NAME}" ! `);
    })
}
module.exports = connection;