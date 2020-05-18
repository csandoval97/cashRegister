const mongoose = require('mongoose')

var stockSchema = new mongoose.Schema({
    barcode:String,
    quantity:Number,
    purDate:Number,
    expDate:Number,
    creDate:Number,
    purPrice:Number,
    retPrice:Number
})

module.exports = mongoose.model('Stocks',stockSchema);