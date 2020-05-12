const mongoose = require('mongoose')

var stockSchema = new mongoose.Schema({
    barcode:String,
    quantity:Number,
    purDate:Date,
    expDate:Date,
    purPrice:Number,
    retPrice:Number
})

module.exports = mongoose.model('Stocks',stockSchema);