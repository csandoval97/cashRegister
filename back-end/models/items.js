const mongoose = require('mongoose')

var ItemSchema = new mongoose.Schema({
    barcode:String,//unique barcode
    barname:String,//friendlyname
    category:String,//category
    creDate:Date,//date of most recent prod
    image:String//image of prod
})

module.exports = mongoose.model('Items', ItemSchema)