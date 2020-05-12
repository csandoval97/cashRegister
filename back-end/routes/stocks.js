var express = require('express');
var router = express.Router();
var moment = require('moment')
var Stocks = require('../models/stocks')
var Items = require('../models/items')

var currDate = moment().format().toString().slice(0,10)
var nextMonth = moment().add(1,"month").format().toString().slice(0,10)
var itemList = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
  var err = ""
  res.render('stocks',{err,currDate,nextMonth})
});

router.post('/addstock',(req,res,next)=>{
  var {barcode,quantity,purDate,expDate,purPrice,retPrice} = req.body
  var stock = new Stocks({barcode,quantity,purDate,expDate,purPrice,retPrice})
  Items.findOneAndUpdate({barcode},{purDate},{new:false,upsert:true},(err, itm)=>{
    console.log(itm)
  })

  stock.save((err)=>{

  })

  itemList = []
  res.render('stocks',{})
})

router.post('/finditem',async (req,res,next)=>{
  itemList = []
  if(req.body.search == 'barcode'){
    var elems = await Items.findOne(req.body.barcode)
    itemList.push(elems)
    console.log(itemList)
  }
  else if(req.body.search == 'prodname'){
    
  }
  else{

  }
  res.render('stocks',{currDate,nextMonth})
})

module.exports = router;