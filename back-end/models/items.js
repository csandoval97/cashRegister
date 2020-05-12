const mongoose = require('mongoose')

var ItemSchema = new mongoose.Schema({
    barcode:String,
    barname:String,
    category:String,
    purDate:Date,
    image:String
})

module.exports = mongoose.model('Items', ItemSchema)