const mongoose = require('mongoose')

var storeSchema = new mongoose.Schema({
    id:Number,
    street:String,
    storeName:String,
    manager:String,
    phone:String,
    stateTax:Number,
    countyTax:Number,
    cityTax:Number,
    districtTax:Number,
    totalTax:Number
})

module.exports = mongoose.model('Stores',storeSchema);