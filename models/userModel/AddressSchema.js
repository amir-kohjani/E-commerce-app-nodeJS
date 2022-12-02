const { Schema } = require('mongoose');

const AddressSchema = new Schema({

    province_name: { type: 'string', required: true },
    city_name: { type: 'string', required: true },
    postAddress: { type: 'string', required: true },
    postCode: { type: 'string', required: true },
    mobilePhone: { type: 'string', required: true },
    phone: String,
    name: { type: 'string', required: true },
    lastName: { type: 'string', required: true },
    title: String,
    discription: String
})


module.exports = AddressSchema;