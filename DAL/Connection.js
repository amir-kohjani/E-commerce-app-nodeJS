const mongoose = require('mongoose');

const connection = () => {
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, authSource: "admin" })
    mongoose.connection.once('open', () => {
        console.log(`mongoose connected to "${process.env.DB_NAME}" ! `);
    })
}
module.exports = connection;