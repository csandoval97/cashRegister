const mongoose = require('mongoose')

var TaxSchema = new mongoose.Schema({
    id:Number,
    category:String,
    tax:Number
})

module.exports = mongoose.model('Tax',TaxSchema)