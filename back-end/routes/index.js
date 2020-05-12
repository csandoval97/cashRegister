var express = require('express');
var router = express.Router();
var Items = require('../models/items')
var Stocks = require('../models/stocks')

var counter = 0
var items = []

/* GET home page. */
router.get('/', function(req, res, next) {
  items = []
  counter = 0
  res.render('home', { title: 'Express',counter,items});
});

router.post('/addbar',async (req,res,next)=>{
  // TODO: make sure repeated items are not added again

  var stockQuery = await Stocks.findOne({barcode:req.body.barcode},(err,stck)=>{
    return stck
  })
  var itemQuery = await Items.findOne({barcode:req.body.barcode},(err,itm)=>{
    return itm
  })
  console.log(stockQuery)
  console.log(itemQuery)

  var item = {id:counter, item:itemQuery.barname,quantity:1 ,price:stockQuery.retPrice}
  items.push(item)
  counter++;

  //console.log(items)
  res.render('home', { title: 'Express',items});
})

router.get('/removebar:id', (req,res, next)=>{
  var numID = parseInt(req.params.id)
  var temps = []
  var index = 0

  counter = 0
  for(var i=0;i<items.length;i++){
    if(i != numID ){
      items[i].id = index
      temps.push(items[i])
      index++
    }
  }
  items = temps
                                                             
  res.render('home', { title: 'Express',items});
})


module.exports = router;
