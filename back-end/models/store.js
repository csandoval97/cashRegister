const mongoose = require('mongoose')

var storeSchema = new mongoose.Schema({
    id:Number,
    addNum:Number,
    addStreet:String,
    storeName:String,
    manager:String,
    stateTax:Number,
    countyTax:Number,
    cityTax:Number,
    districtTax:Number
})

module.exports = mongoose.model('Stores',storeSchema);