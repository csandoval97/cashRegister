var express = require('express');
var moment = require('moment')
var router = express.Router();
var Items = require('../../models/items')
var Stocks = require('../../models/stocks')
var Stores = require('../../models/stores')

router.post('/addbar',async(req,res)=>{
    //console.log(req.body/barcode)
    var itemQuery
    var stockQuery
    var item

    try{
        itemQuery = await Items.findOne({barcode:req.body.barcode},(err,itm)=>{
            return itm
        })
    }
    catch(e){
        res.send({'err':'could not connect to dbitem'})
        return;
    }

    try{
        stockQuery = await Stocks.findOne({barcode:itemQuery.barcode, creDate:itemQuery.creDate},(error,stck)=>{
            return stck;
        })
    }
    catch(e){
        res.send({'err':'could not find item'})
        return;
    }

    item = {barcode:itemQuery.barcode, barname:itemQuery.barname ,price:stockQuery.retPrice}
    // console.log(itemQuery, stockQuery)
    res.send({'item':item})
})

module.exports = router
