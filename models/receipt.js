const mongoose = require('mongoose')

var receiptSchema = new mongoose.Schema({
    receiptID:Number,
    storeID:Number,
    receiptDate:Date,
    itemBarcode:String,
    itemDate:Date,
    cash:Number,
    change:Number
})