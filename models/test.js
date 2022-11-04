
const mongoose = require('mongoose');
const count  = new mongoose.Schema({count:String})
const testSchema = new mongoose.Schema({
    counter:[{type:String}]
})

const TestModel = mongoose.model('TestModel',testSchema);

module.exports =TestModel;